collection = Docs.register      "Docs.collections.GithubRepositories"
collection.extends              "Luca.Collection"
collection.defines
  model: Docs.models.GithubRepository
  url: ()->
    "https://api.github.com/users/datapimp/repos"
    
