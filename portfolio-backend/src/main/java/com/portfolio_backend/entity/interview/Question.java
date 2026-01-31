package com.portfolio_backend.entity.interview;

import jakarta.persistence.*;
import lombok.Data;
import lombok.experimental.Accessors;
import java.time.LocalDateTime;
import java.util.Set;
import java.util.HashSet;

@Entity
@Table(name = "questions")
@Data
@Accessors(chain = true)
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    
    @Column(columnDefinition = "TEXT")
    private String summary;
    
    @Column(name = "content_html", columnDefinition = "LONGTEXT")
    private String contentHtml;
    
    @Column(name = "solution_md", columnDefinition = "LONGTEXT")
    private String solutionMd;

    @Enumerated(EnumType.STRING)
    private Difficulty difficulty = Difficulty.MEDIUM;

    private Long views = 0L;
    private Boolean isPublished = false;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @ManyToMany
    @JoinTable(
        name = "question_tags",
        joinColumns = @JoinColumn(name = "question_id"),
        inverseJoinColumns = @JoinColumn(name = "tag_id")
    )
    private Set<Tag> tags = new HashSet<>();

    public enum Difficulty {
        EASY, MEDIUM, HARD
    }

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
        if (this.views == null) this.views = 0L;
        if (this.isPublished == null) this.isPublished = false;
        if (this.difficulty == null) this.difficulty = Difficulty.MEDIUM;
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}
