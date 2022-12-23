package com.example.flights.repository;

import com.example.flights.model.Flight;

import java.util.ArrayList;
import java.util.List;

public class FlightRepository {
    public static List<Flight> getAllRelevantFlights(){
        List<Flight> flights = new ArrayList<>();
        flights.add(new Flight("Suhareka", "Geneve", 230));
        flights.add(new Flight("Rome", "Skopje", 305));
        flights.add(new Flight("Tirana", "Pisa", 210));
        flights.add(new Flight("Prishtina", "Paris", 430));
        flights.add(new Flight("Prishtina", "Frankfurt", 120));
        flights.add(new Flight("Tirana", "London", 280));
        flights.add(new Flight("Tirana", "Athens", 93));
        flights.add(new Flight("Prishtina", "Vienna", 199));
        flights.add(new Flight("Vienna", "Prishtina", 86));
        return flights;
    }
}
