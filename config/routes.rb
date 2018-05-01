Rails.application.routes.draw do

  devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks' },
  path: '', path_names: { sign_in: 'login', sign_out: 'logout', password: 'secret', confirmation: 'verification', unlock: 'unblock', registration: 'register' }


  authenticated :user do
    root 'users#home', as: :authenticated_root
  end

  root to: 'welcome#welcome'

  get '/profile', to: 'users#profile'
  post '/search_task', to: 'tasks#search'
  post '/search_project', to: 'projects#search'
  resources :teams do
    resources :projects
  end

  resources :projects do
    resources :tasks
  end

end
