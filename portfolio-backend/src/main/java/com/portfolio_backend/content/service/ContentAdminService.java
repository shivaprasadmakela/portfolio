package com.portfolio_backend.content.service;

import com.portfolio_backend.content.dto.CollectionDto;
import com.portfolio_backend.content.dto.QuestionDto;
import com.portfolio_backend.content.entity.Collection;
import com.portfolio_backend.content.entity.Question;
import com.portfolio_backend.content.entity.Tag;
import com.portfolio_backend.content.repository.CollectionRepository;
import com.portfolio_backend.content.repository.CollectionTypeRepository;
import com.portfolio_backend.content.repository.QuestionRepository;
import com.portfolio_backend.content.repository.TagRepository;
import com.portfolio_backend.common.util.SlugGenerator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ContentAdminService {

    private final CollectionRepository collectionRepository;
    private final QuestionRepository questionRepository;
    private final TagRepository tagRepository;
    private final CollectionTypeRepository collectionTypeRepository;
    private final ContentMapper contentMapper;

    @Transactional
    public QuestionDto upsertQuestion(QuestionDto dto) {
        Question question = (dto.getId() != null)
                ? questionRepository.findById(dto.getId()).orElse(new Question())
                : new Question();

        // Generate slug if empty
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
            question.setTags(new java.util.HashSet<>(dto.getTags().stream().map(tagName ->
                    tagRepository.findByName(tagName).orElseGet(() ->
                            tagRepository.save(new Tag().setName(tagName))
                    )
            ).collect(java.util.stream.Collectors.toSet())));
        }

        Question saved = questionRepository.save(question);

        if (dto.getCollectionIds() != null) {
            // Update relationships
            List<Collection> currentCollections = collectionRepository.findAllByQuestionsId(saved.getId());
            for (Collection coll : currentCollections) {
                if (!dto.getCollectionIds().contains(coll.getId())) {
                    coll.getQuestions().remove(saved);
                    collectionRepository.save(coll);
                }
            }

            for (Long collId : dto.getCollectionIds()) {
                Collection coll = collectionRepository.findById(collId)
                        .orElseThrow(() -> new RuntimeException("Collection not found: " + collId));
                if (!coll.getQuestions().contains(saved)) {
                    coll.getQuestions().add(saved);
                    collectionRepository.save(coll);
                }
            }
        }

        return contentMapper.convertToQuestionDto(saved);
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
        return contentMapper.convertToMiniDto(saved);
    }

    @Transactional
    public void deleteCollection(Long id) {
        collectionRepository.deleteById(id);
    }
}
