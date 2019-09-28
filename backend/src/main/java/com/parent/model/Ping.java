package com.parent.model;

public class Ping {

    public String myGreeting;

    public Ping(){
    }

    public Ping(String myGreeting) {
        this.myGreeting = myGreeting;
    }

    public String getPingValue() {
        return myGreeting;
    }
}
