require 'yaml'

set :application, 'my-home'
set :repo_url, 'git@github.com:AydinHassan/home.git'
set :branch, 'master'
set :deploy_to, '/var/www/aydinhassan.co.uk'
set :pty, true
set :log_level, :debug
set :keep_releases, 3

namespace :deploy do

end