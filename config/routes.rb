Rails.application.routes.draw do
  get '/home', to: 'users#show' #show page? Or like a user home page?


  devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks' },
  path: '', path_names: { sign_in: 'login', sign_out: 'logout', password: 'secret', confirmation: 'verification', unlock: 'unblock', registration: 'register' }

  authenticated :user do
    root 'users#show', as: :authenticated_root

  end

  root to: 'welcome#welcome'

  resources :teams

  resources :projects do
    resources :tasks
  end

end
