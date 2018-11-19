Rails.application.routes.draw do
  devise_for :users
  resources :merchants
  resources :savings
  resources :currents
  resources :accounts
  resources :cards
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  get '/check_user', to: 'home#ajax', as: 'checkuser'

  root 'home#index'
end
