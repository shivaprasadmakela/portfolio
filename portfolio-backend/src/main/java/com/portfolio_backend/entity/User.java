package com.portfolio_backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "users")
@Data
public class User {

    @Id
    private UUID id;

    private String email;

    private String name;

    private String passwordHash;

    private LocalDateTime createdAt;

    private LocalDateTime lastLoginAt;
}
