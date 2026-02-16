package com.portfolio_backend.service.interview;

import com.portfolio_backend.dto.interview.CollectionDto;
import com.portfolio_backend.dto.interview.QuestionDto;
import com.portfolio_backend.entity.interview.Collection;
import com.portfolio_backend.entity.interview.Question;
import com.portfolio_backend.entity.interview.Tag;
import com.portfolio_backend.repository.interview.CollectionRepository;
import com.portfolio_backend.repository.interview.QuestionRepository;
import com.portfolio_backend.repository.interview.TagRepository;
import com.portfolio_backend.repository.interview.CollectionTypeRepository;
import com.portfolio_backend.util.SlugGenerator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class InterviewService {

    private final CollectionRepository collectionRepository;
    private final QuestionRepository questionRepository;
    private final TagRepository tagRepository;
    private final CollectionTypeRepository collectionTypeRepository;

    public List<CollectionDto> getAllCategories() {
        return collectionRepository.findAllByTypeNameAndStatus("CATEGORY", Collection.Status.PUBLISHED)
                .stream().map(this::convertToMiniDto).collect(Collectors.toList());
    }

    public List<CollectionDto> getAllSets() {
        return collectionRepository.findAllByTypeNameAndStatus("YOUTUBE_SET", Collection.Status.PUBLISHED)
                .stream().map(this::convertToMiniDto).collect(Collectors.toList());
    }

    public CollectionDto getCollection(Long id) {
        return collectionRepository.findById(id)
                .map(this::convertToFullDto)
                .orElseThrow(() -> new RuntimeException("Collection not found"));
    }

    public CollectionDto getCollectionBySlug(String slug) {
        return collectionRepository.findBySlug(slug)
                .map(this::convertToFullDto)
                .orElseThrow(() -> new RuntimeException("Collection not found with slug: " + slug));
    }

    public QuestionDto getQuestionBySlug(String slug) {
        Question question = questionRepository.findBySlug(slug)
                .orElseThrow(() ->new RuntimeException("Question not found with slug: " + slug));
        
        // Increment view count atomically
        question.setViews(question.getViews() + 1);
        questionRepository.save(question);
        
        return convertToQuestionDto(question);
    }

    public List<QuestionDto> searchQuestions(String query) {
        return questionRepository
                .findByTitleContainingIgnoreCaseOrSummaryContainingIgnoreCaseOrContentHtmlContainingIgnoreCase(
                        query, query, query
                )
                .stream()
                .filter(q -> q.getStatus() == Question.Status.PUBLISHED)
                .map(this::convertToQuestionDto)
                .collect(Collectors.toList());
    }

    public List<QuestionDto> getAllQuestions() {
        return questionRepository.findAll()
                .stream().map(this::convertToQuestionDto).collect(Collectors.toList());
    }

    @Transactional
    public QuestionDto upsertQuestion(QuestionDto dto) {
        Question question = (dto.getId() != null) 
            ? questionRepository.findById(dto.getId()).orElse(new Question())
            : new Question();

        // Auto-generate slug if not provided
        if (dto.getSlug() == null || dto.getSlug().trim().isEmpty()) {
            String baseSlug = SlugGenerator.generateSlug(dto.getTitle());
            String uniqueSlug = SlugGenerator.generateUniqueSlug(
                baseSlug,
                slug -> questionRepository.findBySlug(slug).isPresent()
            );
            dto.setSlug(uniqueSlug);
        }

        question.setTitle(dto.getTitle())
                .setSummary(dto.getSummary())
                .setContentHtml(dto.getContentHtml())
                .setSolutionMd(dto.getSolutionMd())
                .setSlug(dto.getSlug())
                .setStatus(dto.getStatus() != null ? Question.Status.valueOf(dto.getStatus().toUpperCase()) : Question.Status.DRAFT)
                .setDifficulty(Question.Difficulty.valueOf(dto.getDifficulty().toUpperCase()));

        if (dto.getTags() != null) {
            question.setTags(dto.getTags().stream().map(tagName -> 
                tagRepository.findByName(tagName).orElseGet(() -> 
                    tagRepository.save(new Tag().setName(tagName))
                )
            ).collect(Collectors.toSet()));
        }

        Question saved = questionRepository.save(question);

        // Update Collection Mapping
        if (dto.getCollectionIds() != null) {
            // Remove from old collections
            List<Collection> currentCollections = collectionRepository.findAllByQuestionsId(saved.getId());
            for (Collection coll : currentCollections) {
                if (!dto.getCollectionIds().contains(coll.getId())) {
                    coll.getQuestions().remove(saved);
                    collectionRepository.save(coll);
                }
            }

            // Add to new collections
            for (Long collId : dto.getCollectionIds()) {
                Collection coll = collectionRepository.findById(collId)
                        .orElseThrow(() -> new RuntimeException("Collection not found: " + collId));
                if (!coll.getQuestions().contains(saved)) {
                    coll.getQuestions().add(saved);
                    collectionRepository.save(coll);
                }
            }
        }

        return convertToQuestionDto(saved);
    }

    @Transactional
    public void deleteQuestion(Long id) {
        questionRepository.deleteById(id);
    }

    @Transactional
    public CollectionDto upsertCollection(CollectionDto dto) {
        Collection collection = (dto.getId() != null)
            ? collectionRepository.findById(dto.getId()).orElse(new Collection())
            : new Collection();

        // Auto-generate slug if not provided
        if (dto.getSlug() == null || dto.getSlug().trim().isEmpty()) {
            String baseSlug = SlugGenerator.generateSlug(dto.getName());
            String uniqueSlug = SlugGenerator.generateUniqueSlug(
                baseSlug,
                slug -> collectionRepository.findBySlug(slug).isPresent()
            );
            dto.setSlug(uniqueSlug);
        }

        collection.setName(dto.getName())
                  .setSlug(dto.getSlug())
                  .setDescription(dto.getDescription())
                  .setIcon(dto.getIcon())
                  .setThumbnailUrl(dto.getThumbnailUrl())
                  .setVideoId(dto.getVideoId())
                  .setPublishDate(dto.getPublishDate())
                  .setStatus(dto.getStatus() != null ? Collection.Status.valueOf(dto.getStatus().toUpperCase()) : Collection.Status.PUBLISHED);

        if (collection.getType() == null && dto.getType() != null) {
            collection.setType(collectionTypeRepository.findByName(dto.getType())
                    .orElseThrow(() -> new RuntimeException("Collection type not found")));
        }

        Collection saved = collectionRepository.save(collection);
        return convertToMiniDto(saved);
    }

    @Transactional
    public void deleteCollection(Long id) {
        collectionRepository.deleteById(id);
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
        dto.setQuestionCount(collection.getQuestions().size());
        return dto;
    }

    private CollectionDto convertToFullDto(Collection collection) {
        CollectionDto dto = convertToMiniDto(collection);
        dto.setVideoId(collection.getVideoId());
        dto.setPublishDate(collection.getPublishDate());
        dto.setQuestions(collection.getQuestions().stream()
                .map(this::convertToQuestionDto)
                .collect(Collectors.toList()));
        return dto;
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
        
        // Find collections this question belongs to
        List<Collection> collections = collectionRepository.findAllByQuestionsId(q.getId());
        dto.setCollectionIds(collections.stream().map(Collection::getId).collect(Collectors.toList()));
        
        return dto;
    }
}
