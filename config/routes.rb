Rails.application.routes.draw do
  devise_for :users

  resources :accounts do
  resources :savings
  resources :currents
  end

  resources :merchants
  resources :savings
  resources :currents
  resources :cards
  resources :investments
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  get '/check_user', to: 'home#ajax', as: 'checkuser'
  get '/transactions', to: 'savings#index', as: 'transactions'

  root 'home#index'
end
