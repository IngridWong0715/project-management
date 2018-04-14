Rails.application.routes.draw do

  root to: 'welcome#welcome'


  devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }


  get '/home', to: 'users#show' #show page? Or like a user home page?

  resources :projects do
    resources :tasks # nest under projects?!
  end

  get '/login', to: 'sessions#new'
  post '/login', to: 'sessions#create'
  post '/logout', to: 'sessions#destroy'
end
