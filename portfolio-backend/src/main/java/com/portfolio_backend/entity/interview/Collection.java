package com.portfolio_backend.entity.interview;

import jakarta.persistence.*;
import lombok.Data;
import lombok.experimental.Accessors;
import java.time.LocalDateTime;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "collections")
@Data
@Accessors(chain = true)
public class Collection {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    private String thumbnailUrl;
    private String icon;
    private String videoId;
    private LocalDate publishDate;

    @ManyToOne
    @JoinColumn(name = "type_id")
    private CollectionType type;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @ManyToMany
    @JoinTable(
        name = "question_collections",
        joinColumns = @JoinColumn(name = "collection_id"),
        inverseJoinColumns = @JoinColumn(name = "question_id")
    )
    @OrderColumn(name = "order_index")
    private List<Question> questions = new ArrayList<>();

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}
