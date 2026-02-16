# Interview Platform API Documentation

This directory contains comprehensive documentation for the EdTech Interview Platform backend API.

---

## 📚 Documentation Files

### 1. [API_FLOW.md](API_FLOW.md) ⭐ **NEW!**
**Complete guide to API request flow and architecture**

Learn how requests flow through all application layers:
- 🔄 Request lifecycle (HTTP → Controller → Service → Repository → Database)
- 📊 Layer-by-layer execution with real code examples
- 💡 4 detailed examples:
  - Get question by slug (with view tracking)
  - Get collections by type (with filtering)
  - Search questions (complex queries)
  - Create question (transactions & auto-slug)
- 🎯 Design patterns explained (Repository, DTO, Service Layer)
- ⚡ Performance optimizations
- 🔐 Transaction management

**Perfect for:** Understanding the codebase architecture, onboarding new developers, debugging request flows

---

## 🗂️ Project Structure

```
portfolio-backend/
├── src/main/resources/docs/
│   ├── README.md      ← You are here
│   └── API_FLOW.md    ← API architecture guide
│
├── src/main/java/.../
│   ├── controller/    ← HTTP endpoints
│   │   └── interview/InterviewController.java
│   ├── service/       ← Business logic
│   │   └── interview/InterviewService.java
│   ├── repository/    ← Database queries
│   │   ├── interview/QuestionRepository.java
│   │   ├── interview/CollectionRepository.java
│   │   └── interview/TagRepository.java
│   ├── entity/        ← Database models
│   │   ├── User.java
│   │   └── interview/{Question, Collection, Tag}.java
│   ├── dto/           ← API data transfer objects
│   │   └── interview/{QuestionDto, CollectionDto}.java
│   └── util/          ← Utilities
│       └── SlugGenerator.java
│
└── src/main/resources/
    └── db/migration/  ← Flyway SQL migrations
        ├── V1__init.sql
        ├── V2__insert_questions.sql
        └── V3__interview_v3_core.sql
```

---

## 🚀 Quick Reference

### API Endpoints

**Public Endpoints:**
```
GET  /api/interview/categories                    - List all categories (PUBLISHED only)
GET  /api/interview/sets                          - List all YouTube sets (PUBLISHED only)
GET  /api/interview/collections/{slug}            - Get collection by slug or ID
GET  /api/interview/questions/{slug}              - Get question by slug (auto-increments views)
GET  /api/interview/questions/search?q={query}    - Search questions (title, summary, content)
```

**Admin Endpoints:**
```
POST   /api/interview/admin/questions              - Create/update question
DELETE /api/interview/admin/questions/{id}         - Delete question
PATCH  /api/interview/admin/questions/{id}/publish - Publish question
POST   /api/interview/admin/collections            - Create/update collection
```

---

## 🔑 Key Features

- ✅ **SEO-Friendly URLs** - Auto-generated slugs for clean URLs
- ✅ **Status Management** - DRAFT/PUBLISHED/ARCHIVED workflow
- ✅ **View Tracking** - Auto-increment views on question access
- ✅ **Full-Text Search** - Search across title, summary, and content
- ✅ **Collections** - Categories & YouTube video sets
- ✅ **Tags** - Flexible tagging system
- ✅ **Transactions** - ACID guarantees with `@Transactional`
- ✅ **Performance** - Database indexes for fast queries

---

## 📖 Related Documentation

**In Backend Project:**
- `src/main/resources/db/migration/` - Database schema files
- `pom.xml` - Maven dependencies

**In Artifacts Folder:**
- `data_examples.md` - Sample SQL inserts and JSON responses
- `walkthrough.md` - Testing and verification guide
- `implementation_summary.md` - Change log

---

## 💡 How to Use This Documentation

1. **New to the project?** Start with `API_FLOW.md` to understand the architecture
2. **Need to add a feature?** Check `API_FLOW.md` for layer responsibilities
3. **Debugging?** Follow the request flow in `API_FLOW.md`
4. **Writing tests?** See examples in `API_FLOW.md`

---

## 🛠️ Development Tips

### Running the Application
```bash
mvn spring-boot:run
```

### Testing an Endpoint
```bash
curl http://localhost:8080/api/interview/categories
```

### Checking Database
```bash
mysql -u root -p portfolio
SELECT * FROM questions WHERE status = 'PUBLISHED';
```

---

For detailed API flow and architecture, see **[API_FLOW.md](API_FLOW.md)** ⭐
