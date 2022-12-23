package com.example.flights.activity;

import androidx.appcompat.app.AppCompatActivity;

import android.annotation.SuppressLint;
import android.os.Bundle;
import android.widget.ListView;

import com.example.flights.R;
import com.example.flights.adapter.FlightsAdapter;
import com.example.flights.model.Flight;
import com.example.flights.repository.FlightRepository;
import com.example.flights.util.Utils;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

public class MainActivity extends AppCompatActivity {

    private List<Flight> flights;
    private ListView flightsView;

    @SuppressLint("NewApi")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        flights = FlightRepository.getAllRelevantFlights();
        flights.sort((a, b) -> {
            return b.price - a.price;
        });

        FlightsAdapter flightsAdapter = new FlightsAdapter(flights, this);

        flightsView = findViewById(R.id.flightsList);
        flightsView.setAdapter(flightsAdapter);
    }
}