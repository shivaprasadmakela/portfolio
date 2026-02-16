package com.portfolio_backend.repository.interview;

import com.portfolio_backend.entity.interview.Collection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface CollectionRepository extends JpaRepository<Collection, Long> {
    
    @Query("SELECT c FROM Collection c WHERE c.type.name = :typeName")
    List<Collection> findAllByTypeName(@Param("typeName") String typeName);

    @Query("SELECT c FROM Collection c WHERE c.type.name = :typeName AND c.status = :status")
    List<Collection> findAllByTypeNameAndStatus(@Param("typeName") String typeName, @Param("status") Collection.Status status);

    @Query("SELECT c FROM Collection c JOIN c.questions q WHERE q.id = :questionId")
    List<Collection> findAllByQuestionsId(@Param("questionId") Long questionId);
    
    Optional<Collection> findBySlug(String slug);
}
