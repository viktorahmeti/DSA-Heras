package com.example.flights.adapter;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.TextView;

import com.example.flights.R;
import com.example.flights.model.Flight;

import java.util.List;

public class FlightsAdapter extends BaseAdapter {
    private List<Flight> flights;
    private Context context;
    private LayoutInflater layoutInflater;

    public FlightsAdapter(List<Flight> flights, Context context){
        this.flights = flights;
        this.context = context;
        this.layoutInflater = LayoutInflater.from(context);
    }

    @Override
    public int getCount() {
        return flights.size();
    }

    @Override
    public Object getItem(int i) {
        return flights.get(i);
    }

    @Override
    public long getItemId(int i) {
        return i;
    }

    @Override
    public View getView(int i, View view, ViewGroup viewGroup) {
        view = layoutInflater.inflate(R.layout.flight_cell, null);
        TextView fromText = (TextView) view.findViewById(R.id.flight_cell_from);
        TextView toText = (TextView) view.findViewById(R.id.flight_cell_to);
        TextView priceText = (TextView) view.findViewById(R.id.flight_cell_price);

        Flight flight = (Flight) getItem(i);

        fromText.setText(flight.from);
        toText.setText(flight.to);
        priceText.setText(String.valueOf(flight.price) + "e");

        return view;
    }
}
