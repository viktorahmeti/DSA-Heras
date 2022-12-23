package com.example.flights.model;

public class Flight {
    public Flight(String from, String to, int price) {
        this.from = from;
        this.to = to;
        this.price = price;
    }

    public String from;
    public String to;
    public int price;
}
