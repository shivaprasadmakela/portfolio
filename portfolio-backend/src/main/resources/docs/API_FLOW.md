# Interview API - Request Flow & Architecture

## Overview

This document explains how requests flow through the Interview API, from the HTTP layer down to the database and back. It covers the complete request lifecycle, layer responsibilities, and execution logic.

---

## Architecture Layers

```
┌─────────────────────────────────────────────────────────────┐
│                    HTTP Request                              │
│          GET /api/interview/questions/closures               │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│  LAYER 1: CONTROLLER (InterviewController.java)             │
│  • Parse HTTP request                                        │
│  • Validate path parameters                                  │
│  • Call service layer                                        │
│  • Return HTTP response                                      │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│  LAYER 2: SERVICE (InterviewService.java)                   │
│  • Business logic                                            │
│  • Data transformation                                       │
│  • Call repository layer                                     │
│  • Convert entities to DTOs                                  │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│  LAYER 3: REPOSITORY (QuestionRepository.java)              │
│  • Database queries (JPA)                                    │
│  • Return entity objects                                     │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│  LAYER 4: DATABASE (MySQL)                                   │
│  • Execute SQL queries                                       │
│  • Return result sets                                        │
└─────────────────────────────────────────────────────────────┘
```

---

## Example 1: Get Question by Slug

### Request Flow

**HTTP Request:**
```http
GET /api/interview/questions/explain-closure-in-javascript
```

### Step-by-Step Execution

#### 1️⃣ **Controller Layer** (`InterviewController.java`)

```java
@RestController
@RequestMapping("/api/interview")
public class InterviewController {
    
    @GetMapping("/questions/{slug}")
    public QuestionDto getQuestion(@PathVariable String slug) {
        // ✅ Extract slug from URL path
        // ✅ Delegate to service layer
        return interviewService.getQuestionBySlug(slug);
    }
}
```

**What happens:**
- Spring extracts `slug` = `"explain-closure-in-javascript"` from URL
- Controller calls `interviewService.getQuestionBySlug(slug)`
- Returns the DTO as JSON response

---

#### 2️⃣ **Service Layer** (`InterviewService.java`)

```java
@Service
@RequiredArgsConstructor
public class InterviewService {
    
    private final QuestionRepository questionRepository;
    
    public QuestionDto getQuestionBySlug(String slug) {
        // Step 1: Query database for question
        Question question = questionRepository.findBySlug(slug)
                .orElseThrow(() -> new RuntimeException("Question not found with slug: " + slug));
        
        // Step 2: Increment view count (business logic)
        question.setViews(question.getViews() + 1);
        questionRepository.save(question);
        
        // Step 3: Convert entity to DTO
        return convertToQuestionDto(question);
    }
    
    private QuestionDto convertToQuestionDto(Question q) {
        QuestionDto dto = new QuestionDto();
        dto.setId(q.getId());
        dto.setTitle(q.getTitle());
        dto.setSlug(q.getSlug());
        dto.setSummary(q.getSummary());
        dto.setContentHtml(q.getContentHtml());
        dto.setSolutionMd(q.getSolutionMd());
        dto.setDifficulty(q.getDifficulty().name());
        dto.setStatus(q.getStatus().name());
        dto.setViews(q.getViews());
        dto.setTags(q.getTags().stream().map(Tag::getName).collect(Collectors.toList()));
        dto.setCreatedBy(q.getCreatedBy() != null ? q.getCreatedBy().getId() : null);
        
        // Get collection IDs
        List<Long> collectionIds = questionCollectionRepository
            .findAllByQuestionsId(q.getId())
            .stream()
            .map(Collection::getId)
            .collect(Collectors.toList());
        dto.setCollectionIds(collectionIds);
        
        return dto;
    }
}
```

**What happens:**
1. **Database Query**: Calls repository to find question by slug
2. **Error Handling**: Throws exception if not found
3. **Business Logic**: Increments view count atomically
4. **Database Update**: Saves updated question
5. **DTO Conversion**: Transforms entity to DTO with all relations

---

#### 3️⃣ **Repository Layer** (`QuestionRepository.java`)

```java
@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {
    Optional<Question> findBySlug(String slug);
}
```

**What happens:**
- Spring Data JPA generates SQL query automatically
- Executes query against database
- Maps result to `Question` entity
- Returns `Optional<Question>`

**Generated SQL:**
```sql
SELECT * FROM questions WHERE slug = 'explain-closure-in-javascript';
```

---

#### 4️⃣ **Database Layer** (MySQL)

**Execution:**
1. MySQL receives query
2. Uses `UK_QUESTIONS_SLUG` index for fast lookup
3. Returns matching row
4. JPA maps columns to `Question` entity fields

**Result (from DB):**
```
+----+----------------------------------+------------------------------------+--------+----------+-------+
| ID | TITLE                            | SLUG                               | STATUS | VIEWS    | ...   |
+----+----------------------------------+------------------------------------+--------+----------+-------+
|  1 | Explain Closure in JavaScript    | explain-closure-in-javascript      | PUB... | 127      | ...   |
+----+----------------------------------+------------------------------------+--------+----------+-------+
```

---

#### 5️⃣ **Response Flow (Bottom-Up)**

**Database → Repository:**
```java
Question(
    id=1,
    title="Explain Closure in JavaScript",
    slug="explain-closure-in-javascript",
    status=PUBLISHED,
    views=128,  // Incremented from 127
    tags=[Tag(name="Closure"), Tag(name="Scope")],
    ...
)
```

**Repository → Service:**
```java
Optional<Question> containing the above entity
```

**Service → Controller:**
```java
QuestionDto(
    id=1,
    title="Explain Closure in JavaScript",
    slug="explain-closure-in-javascript",
    difficulty="MEDIUM",
    status="PUBLISHED",
    views=128,
    tags=["Closure", "Scope"],
    collectionIds=[1, 2]
)
```

**Controller → HTTP Response:**
```json
{
  "id": 1,
  "title": "Explain Closure in JavaScript",
  "slug": "explain-closure-in-javascript",
  "summary": "What is a closure and how does it work?",
  "difficulty": "MEDIUM",
  "status": "PUBLISHED",
  "views": 128,
  "tags": ["Closure", "Scope"],
  "collectionIds": [1, 2]
}
```

---

## Example 2: Get Collections by Type (with Filtering)

### Request Flow

**HTTP Request:**
```http
GET /api/interview/categories
```

### Step-by-Step Execution

#### 1️⃣ **Controller**

```java
@GetMapping("/categories")
public List<CollectionDto> getAllCategories() {
    return interviewService.getAllCategories();
}
```

---

#### 2️⃣ **Service**

```java
public List<CollectionDto> getAllCategories() {
    return collectionRepository
        .findAllByTypeNameAndStatus("CATEGORY", Collection.Status.PUBLISHED)
        .stream()
        .map(this::convertToMiniDto)
        .collect(Collectors.toList());
}

private CollectionDto convertToMiniDto(Collection collection) {
    CollectionDto dto = new CollectionDto();
    dto.setId(collection.getId());
    dto.setName(collection.getName());
    dto.setSlug(collection.getSlug());
    dto.setDescription(collection.getDescription());
    dto.setIcon(collection.getIcon());
    dto.setThumbnailUrl(collection.getThumbnailUrl());
    dto.setType(collection.getType().getName());
    dto.setStatus(collection.getStatus().name());
    return dto;
}
```

**Logic Flow:**
1. Query for all CATEGORY collections with PUBLISHED status
2. Stream results
3. Convert each entity to mini DTO (without questions)
4. Collect to list

---

#### 3️⃣ **Repository**

```java
@Query("SELECT c FROM Collection c WHERE c.type.name = :typeName AND c.status = :status")
List<Collection> findAllByTypeNameAndStatus(
    @Param("typeName") String typeName,
    @Param("status") Collection.Status status
);
```

**Generated SQL:**
```sql
SELECT c.* 
FROM collections c
INNER JOIN collection_types ct ON c.TYPE_ID = ct.ID
WHERE ct.NAME = 'CATEGORY' 
  AND c.STATUS = 'PUBLISHED';
```

**Uses Index:** `IDX_COLLECTION_TYPE_STATUS`

---

#### 4️⃣ **Response**

```json
[
  {
    "id": 1,
    "name": "JavaScript",
    "slug": "javascript",
    "description": "Master JavaScript fundamentals",
    "icon": "js-icon",
    "type": "CATEGORY",
    "status": "PUBLISHED"
  },
  {
    "id": 3,
    "name": "React",
    "slug": "react",
    "description": "Learn React library",
    "icon": "react-icon",
    "type": "CATEGORY",
    "status": "PUBLISHED"
  }
]
```

---

## Example 3: Search Questions (Complex Query)

### Request Flow

**HTTP Request:**
```http
GET /api/interview/questions/search?q=closure
```

### Execution

#### 1️⃣ **Controller**

```java
@GetMapping("/questions/search")
public List<QuestionDto> searchQuestions(@RequestParam String q) {
    return interviewService.searchQuestions(q);
}
```

---

#### 2️⃣ **Service**

```java
public List<QuestionDto> searchQuestions(String query) {
    return questionRepository
        .findByTitleContainingIgnoreCaseOrSummaryContainingIgnoreCaseOrContentHtmlContainingIgnoreCase(
            query, query, query
        )
        .stream()
        .filter(q -> q.getStatus() == Question.Status.PUBLISHED)  // Filter PUBLISHED only
        .map(this::convertToQuestionDto)
        .collect(Collectors.toList());
}
```

**Logic:**
1. Search across title, summary, and content fields (case-insensitive)
2. Filter results to only PUBLISHED questions
3. Convert to DTOs
4. Return list

---

#### 3️⃣ **Repository**

```java
List<Question> findByTitleContainingIgnoreCaseOrSummaryContainingIgnoreCaseOrContentHtmlContainingIgnoreCase(
    String title, String summary, String content
);
```

**Generated SQL:**
```sql
SELECT * FROM questions
WHERE LOWER(title) LIKE LOWER('%closure%')
   OR LOWER(summary) LIKE LOWER('%closure%')
   OR LOWER(content_html) LIKE LOWER('%closure%');
```

**Note:** This uses full table scan. For production, consider full-text search indexes!

---

## Example 4: Create Question (Admin)

### Request Flow

**HTTP Request:**
```http
POST /api/interview/admin/questions
Content-Type: application/json

{
  "title": "What is Event Bubbling?",
  "summary": "Explain event bubbling in the DOM",
  "difficulty": "EASY",
  "status": "DRAFT",
  "collectionIds": [1],
  "tagIds": [5]
}
```

### Execution

#### 1️⃣ **Controller**

```java
@PostMapping("/admin/questions")
public QuestionDto upsertQuestion(@RequestBody QuestionDto dto) {
    return interviewService.upsertQuestion(dto);
}
```

**Spring automatically deserializes JSON → `QuestionDto` object**

---

#### 2️⃣ **Service**

```java
@Transactional
public QuestionDto upsertQuestion(QuestionDto dto) {
    // Step 1: Create or find existing question
    Question question = (dto.getId() != null) 
        ? questionRepository.findById(dto.getId()).orElse(new Question())
        : new Question();

    // Step 2: Auto-generate slug if not provided
    if (dto.getSlug() == null || dto.getSlug().trim().isEmpty()) {
        String baseSlug = SlugGenerator.generateSlug(dto.getTitle());
        String uniqueSlug = SlugGenerator.generateUniqueSlug(
            baseSlug,
            slug -> questionRepository.findBySlug(slug).isPresent()
        );
        dto.setSlug(uniqueSlug);
    }

    // Step 3: Map DTO fields to entity
    question.setTitle(dto.getTitle())
            .setSummary(dto.getSummary())
            .setContentHtml(dto.getContentHtml())
            .setSolutionMd(dto.getSolutionMd())
            .setSlug(dto.getSlug())
            .setStatus(Question.Status.valueOf(dto.getStatus().toUpperCase()))
            .setDifficulty(Question.Difficulty.valueOf(dto.getDifficulty().toUpperCase()));

    // Step 4: Handle tags
    if (dto.getTagIds() != null) {
        Set<Tag> tags = dto.getTagIds().stream()
            .map(id -> tagRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tag not found")))
            .collect(Collectors.toSet());
        question.setTags(tags);
    }

    // Step 5: Save question
    question = questionRepository.save(question);

    // Step 6: Handle collections (many-to-many)
    if (dto.getCollectionIds() != null) {
        for (Long collectionId : dto.getCollectionIds()) {
            Collection collection = collectionRepository.findById(collectionId)
                .orElseThrow(() -> new RuntimeException("Collection not found"));
            if (!collection.getQuestions().contains(question)) {
                collection.getQuestions().add(question);
                collectionRepository.save(collection);
            }
        }
    }

    // Step 7: Convert to DTO and return
    return convertToQuestionDto(question);
}
```

**Transaction flow:**
1. ✅ Start transaction
2. ✅ Generate slug: `"What is Event Bubbling?"` → `"what-is-event-bubbling"`
3. ✅ Create Question entity
4. ✅ Find and attach tags
5. ✅ Save question (INSERT)
6. ✅ Link to collections (INSERT into question_collections)
7. ✅ Commit transaction
8. ✅ Return DTO

---

#### 3️⃣ **Repository & Database**

**Multiple SQL queries executed:**

```sql
-- 1. Check slug uniqueness
SELECT * FROM questions WHERE slug = 'what-is-event-bubbling';

-- 2. Find tags
SELECT * FROM tags WHERE id IN (5);

-- 3. Insert question
INSERT INTO questions (title, slug, summary, content_html, solution_md, difficulty, status, views, created_at)
VALUES ('What is Event Bubbling?', 'what-is-event-bubbling', '...', '...', '...', 'EASY', 'DRAFT', 0, NOW());

-- 4. Link tags (question_tags table)
INSERT INTO question_tags (question_id, tag_id) VALUES (4, 5);

-- 5. Link collections (question_collections table)
INSERT INTO question_collections (question_id, collection_id, order_index) VALUES (4, 1, 3);
```

**All wrapped in a single transaction due to `@Transactional`**

---

## Key Design Patterns

### 1. **Repository Pattern**
- Abstracts database access
- JPA generates SQL automatically
- Clean separation of concerns

### 2. **DTO Pattern**
- Entities stay internal
- DTOs for external communication
- Prevents over-fetching

### 3. **Service Layer**
- Contains business logic
- Orchestrates repository calls
- Handles transactions

### 4. **Dependency Injection**
- `@RequiredArgsConstructor` (Lombok)
- Constructor injection
- Loose coupling

---

## Transaction Management

### @Transactional Annotation

```java
@Transactional
public QuestionDto upsertQuestion(QuestionDto dto) {
    // All database operations in ONE transaction
    // If any step fails, ALL changes are rolled back
}
```

**Guarantees:**
- ✅ **Atomicity**: All or nothing
- ✅ **Isolation**: Other requests don't see partial changes
- ✅ **Durability**: Changes are permanent once committed

---

## Error Handling

### Common Exceptions

```java
// 1. Entity not found
questionRepository.findBySlug(slug)
    .orElseThrow(() -> new RuntimeException("Question not found with slug: " + slug));

// 2. Validation errors (Spring handles)
@PostMapping("/admin/questions")
public QuestionDto upsertQuestion(@Valid @RequestBody QuestionDto dto) {
    // Spring validates DTO automatically
}

// 3. Database constraints
// Unique slug violation → SQL exception → HTTP 500
```

---

## Performance Optimizations

### 1. **Indexes**
```sql
-- Fast slug lookups
CREATE INDEX UK_QUESTIONS_SLUG ON questions(slug);

-- Fast status filtering
CREATE INDEX IDX_QUESTION_STATUS ON questions(status);
```

### 2. **Lazy Loading**
```java
@ManyToMany(fetch = FetchType.LAZY)
private Set<Tag> tags;
```
- Tags only loaded when accessed
- Prevents N+1 queries

### 3. **DTO Projections**
```java
// Mini DTO for list views (no content)
convertToMiniDto(collection);

// Full DTO for detail views (with content)
convertToFullDto(collection);
```

---

## Summary

### Request Lifecycle

```
Client Request
    ↓
[Controller]  ← Parse HTTP, validate params
    ↓
[Service]     ← Business logic, transactions
    ↓
[Repository]  ← Database queries (JPA)
    ↓
[Database]    ← Execute SQL, return data
    ↓
[Repository]  ← Map to entities
    ↓
[Service]     ← Convert to DTOs
    ↓
[Controller]  ← Serialize to JSON
    ↓
Client Response
```

### Layer Responsibilities

| Layer | Responsibility | Technology |
|-------|---------------|------------|
| **Controller** | HTTP handling, routing | Spring MVC `@RestController` |
| **Service** | Business logic, transactions | `@Service`, `@Transactional` |
| **Repository** | Database queries | Spring Data JPA |
| **Database** | Data persistence | MySQL |

---

This architecture provides clean separation of concerns, testability, and maintainability! 🚀
