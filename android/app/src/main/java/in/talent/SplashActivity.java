package net.mobiwood; 
import android.content.Intent;
import android.os.Bundle;
import androidx.appcompat.app.AppCompatActivity;

public class SplashActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        Intent intent = new Intent(this, MainActivity.class);

        new android.os.Handler().postDelayed(
            new Runnable() {
                public void run() {
                    startActivity(intent);
                     finish();
                }
            }, 
        1000);
      
       
    }
}