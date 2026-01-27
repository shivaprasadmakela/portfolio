package com.portfolio_backend.entity.base;

import jakarta.persistence.*;
import lombok.Data;
import lombok.experimental.Accessors;
import lombok.experimental.FieldNameConstants;
import java.time.LocalDateTime;

@MappedSuperclass
@Data
@Accessors(chain = true)
@FieldNameConstants
public abstract class BaseEntity<T extends BaseEntity<T>> {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Boolean isActive = true;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
        if (this.isActive == null) {
            this.isActive = true;
        }
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    protected BaseEntity() {}

    protected BaseEntity(BaseEntity<T> other) {
        this.id = other.id;
        this.isActive = other.isActive;
        this.createdAt = other.createdAt;
        this.updatedAt = other.updatedAt;
    }
}
