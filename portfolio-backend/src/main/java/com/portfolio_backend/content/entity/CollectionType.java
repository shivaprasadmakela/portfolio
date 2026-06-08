package com.portfolio_backend.content.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.experimental.Accessors;

@Entity
@Table(name = "collection_types")
@Data
@Accessors(chain = true)
public class CollectionType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(unique = true, nullable = false)
    private String name; // CATEGORY, YOUTUBE_SET
}
