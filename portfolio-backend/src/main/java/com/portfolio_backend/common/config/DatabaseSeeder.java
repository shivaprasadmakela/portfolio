package com.portfolio_backend.common.config;

import com.portfolio_backend.checkin.repository.VerificationQuestionRepository;
import com.portfolio_backend.content.repository.CollectionTypeRepository;
import com.portfolio_backend.content.entity.CollectionType;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.jdbc.datasource.init.ResourceDatabasePopulator;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.sql.Connection;

@Component
@RequiredArgsConstructor
public class DatabaseSeeder implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(DatabaseSeeder.class);

    private final VerificationQuestionRepository verificationQuestionRepository;
    private final CollectionTypeRepository collectionTypeRepository;
    private final DataSource dataSource;

    @Override
    public void run(String... args) {
        try {
            seedCollectionTypes();
            seedVerificationQuestions();
        } catch (Exception e) {
            // Log and continue — do NOT crash the app on startup seeding failure.
            // Cloud Run health checks will fail if startup throws an exception.
            logger.error("DatabaseSeeder encountered an error during startup seeding. App will continue.", e);
        }
    }

    private void seedCollectionTypes() {
        if (collectionTypeRepository.count() == 0) {
            logger.info("Seeding collection types...");
            collectionTypeRepository.save(new CollectionType().setName("CATEGORY"));
            collectionTypeRepository.save(new CollectionType().setName("YOUTUBE_SET"));
            collectionTypeRepository.save(new CollectionType().setName("LEARNING_PATH"));
            logger.info("Collection types seeded.");
        }
    }

    private void seedVerificationQuestions() {
        if (verificationQuestionRepository.count() == 0) {
            logger.info("Seeding verification questions...");
            ResourceDatabasePopulator populator = new ResourceDatabasePopulator();
            populator.addScript(new ClassPathResource("db/migration/V2__insert_questions.sql"));
            // Use try-with-resources to prevent connection leak
            try (Connection conn = dataSource.getConnection()) {
                populator.populate(conn);
            } catch (Exception e) {
                logger.error("Failed to seed verification questions.", e);
                throw new RuntimeException("Failed to seed verification questions", e);
            }
            logger.info("Verification questions seeded.");
        }
    }
}
