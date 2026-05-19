import java.net.URL;
import java.net.HttpURLConnection;
import java.io.InputStreamReader;
import java.io.BufferedReader;
import java.io.OutputStream;

public class TestStream {
    public static void main(String[] args) throws Exception {
        String apiKey = "AIzaSyD9opBFEdRxtGsn3mOCYQVa-cq6VAtHt1Q";
        String urlString = "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:streamGenerateContent?alt=sse&key=" + apiKey;
        
        URL url = new URL(urlString);
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("POST");
        conn.setRequestProperty("Content-Type", "application/json");
        conn.setDoOutput(true);
        
        String jsonInputString = "{\"contents\":[{\"parts\":[{\"text\":\"Count from 1 to 20 slowly, adding a lot of text so it streams\"}]}]}";
        
        try(OutputStream os = conn.getOutputStream()) {
            byte[] input = jsonInputString.getBytes("utf-8");
            os.write(input, 0, input.length);           
        }
        
        int status = conn.getResponseCode();
        if (status != 200) {
            System.out.println("Error: " + status);
            try(BufferedReader br = new BufferedReader(new InputStreamReader(conn.getErrorStream(), "utf-8"))) {
                String line;
                while ((line = br.readLine()) != null) {
                    System.out.println(line);
                }
            }
            return;
        }
        
        try(BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream(), "utf-8"))) {
            String line;
            while ((line = br.readLine()) != null) {
                System.out.println(System.currentTimeMillis() + ": " + line);
            }
        }
    }
}
