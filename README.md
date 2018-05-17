# Project Management

Project Management lets user easily manage individual projects and collaborate on team projects.
For any project, the user can create and edit, add tasks, and share with a team.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them

```
Give examples
```

### Installing

Step 1. Fork and clone the repo from https://github.com/IngridWong0715/project-management
Step 2. Run `bundle install` to install all dependencies
Step 3. Migrate and seed the the database with `rake db:migrate` and `rake db:seed`



## Built With
* Ruby on Rails
* Javascript & jQuery

## Contributing

For any issue, please file an issue with a pull request.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

## Authors

* **Ingrid Wong** - *Initial work* - [Ingrid Wong](https://github.com/IngridWong0715)

See also the list of [contributors](https://github.com/IngridWong0715/project-management/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments


FOR USER.RB

has_and_belongs_to_many :teams
has_many :projects
has_many :tasks, through: :projects

has_secure_password
validates :name, presence: true
validates :email, presence: true
