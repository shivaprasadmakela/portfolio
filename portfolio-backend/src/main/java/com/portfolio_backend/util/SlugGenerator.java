package com.portfolio_backend.util;

import java.text.Normalizer;
import java.util.regex.Pattern;

/**
 * Utility class for generating SEO-friendly URL slugs from titles.
 * 
 * Examples:
 * - "Explain Closure in JavaScript" → "explain-closure-in-javascript"
 * - "What is REST API?" → "what-is-rest-api"
 * - "Top 10 React Questions (2024)" → "top-10-react-questions-2024"
 */
public class SlugGenerator {

    private static final Pattern NON_LATIN = Pattern.compile("[^\\w-]");
    private static final Pattern WHITESPACE = Pattern.compile("[\\s]");
    private static final Pattern MULTIPLE_DASHES = Pattern.compile("-+");

    /**
     * Generate a slug from a given title.
     * 
     * @param input The input string (e.g., question title, collection name)
     * @return A URL-safe slug
     */
    public static String generateSlug(String input) {
        if (input == null || input.trim().isEmpty()) {
            return "";
        }

        String slug = input.toLowerCase().trim();
        
        // Normalize Unicode characters (e.g., é → e)
        slug = Normalizer.normalize(slug, Normalizer.Form.NFD);
        
        // Replace whitespace with dashes
        slug = WHITESPACE.matcher(slug).replaceAll("-");
        
        // Remove non-latin characters (keep alphanumeric, dashes, underscores)
        slug = NON_LATIN.matcher(slug).replaceAll("");
        
        // Replace multiple consecutive dashes with single dash
        slug = MULTIPLE_DASHES.matcher(slug).replaceAll("-");
        
        // Remove leading/trailing dashes
        slug = slug.replaceAll("^-+|-+$", "");
        
        return slug;
    }

    /**
     * Generate a unique slug by appending a numeric suffix if needed.
     * 
     * @param baseSlug The base slug to make unique
     * @param existingSlugChecker Function to check if a slug already exists
     * @return A unique slug
     */
    public static String generateUniqueSlug(String baseSlug, java.util.function.Predicate<String> existingSlugChecker) {
        String slug = baseSlug;
        int counter = 1;
        
        while (existingSlugChecker.test(slug)) {
            slug = baseSlug + "-" + counter;
            counter++;
        }
        
        return slug;
    }
}
