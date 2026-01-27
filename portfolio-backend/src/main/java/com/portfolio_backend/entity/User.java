package com.portfolio_backend.entity;

import com.portfolio_backend.entity.base.BaseEntity;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import lombok.experimental.Accessors;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Data
@EqualsAndHashCode(callSuper = true)
@ToString(callSuper = true)
@Accessors(chain = true)
public class User extends BaseEntity<User> {

    private String email;

    private String name;

    private String passwordHash;

    private LocalDateTime lastLoginAt;
}
