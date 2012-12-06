_.def('<%= javascript_namespace %>.Router').extends('Luca.Router').with

  routes:
    "" : <%= javascript_namespace %>.route("home") 