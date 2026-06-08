package com.portfolio_backend.content.repository;

import com.portfolio_backend.content.entity.CollectionType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface CollectionTypeRepository extends JpaRepository<CollectionType, Integer> {
    Optional<CollectionType> findByName(String name);
}
