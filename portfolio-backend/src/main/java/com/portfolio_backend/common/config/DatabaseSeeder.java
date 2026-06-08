package com.portfolio_backend.common.config;

import com.portfolio_backend.checkin.repository.VerificationQuestionRepository;
import com.portfolio_backend.content.repository.CollectionTypeRepository;
import com.portfolio_backend.content.entity.CollectionType;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.jdbc.datasource.init.ResourceDatabasePopulator;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;

@Component
@RequiredArgsConstructor
public class DatabaseSeeder implements CommandLineRunner {

    private final VerificationQuestionRepository verificationQuestionRepository;
    private final CollectionTypeRepository collectionTypeRepository;
    private final DataSource dataSource;

    @Override
    public void run(String... args) throws Exception {
        if (collectionTypeRepository.count() == 0) {
            collectionTypeRepository.save(new CollectionType().setName("CATEGORY"));
            collectionTypeRepository.save(new CollectionType().setName("YOUTUBE_SET"));
            collectionTypeRepository.save(new CollectionType().setName("LEARNING_PATH"));
        }

        if (verificationQuestionRepository.count() == 0) {
            ResourceDatabasePopulator populator = new ResourceDatabasePopulator();
            populator.addScript(new ClassPathResource("db/migration/V2__insert_questions.sql"));
            populator.populate(dataSource.getConnection());
        }
    }
}
