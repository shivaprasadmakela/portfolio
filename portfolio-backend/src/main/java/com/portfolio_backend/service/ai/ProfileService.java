package com.portfolio_backend.service.ai;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.annotation.PostConstruct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Service
public class ProfileService {

    private static final Logger logger = LoggerFactory.getLogger(ProfileService.class);
    private final ObjectMapper objectMapper = new ObjectMapper();
    private final Map<String, String> profileData = new HashMap<>();

    public ProfileService() {
    }

    @PostConstruct
    public void loadProfiles() {
        try {
            PathMatchingResourcePatternResolver resolver = new PathMatchingResourcePatternResolver();
            Resource[] resources = resolver.getResources("classpath:ai/profile/*.json");

            for (Resource resource : resources) {
                String filename = resource.getFilename();
                if (filename != null) {
                    String key = filename.replace(".json", "");
                    Object json = objectMapper.readValue(resource.getInputStream(), Object.class);
                    String minifiedJson = objectMapper.writeValueAsString(json);
                    profileData.put(key, minifiedJson);
                    logger.info("Loaded AI profile section: {}", key);
                }
            }
        } catch (IOException e) {
            logger.error("Failed to load AI profile sections", e);
        }
    }

    public String getSection(String key) {
        return profileData.getOrDefault(key, "");
    }

    public Map<String, String> getAllSections() {
        return profileData;
    }
}
