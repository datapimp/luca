# The SimpleCollectionView class is a CollectionView without any of the
# bells and whistles ( filtering, pagination, sorting, etc )
simple = Luca.register    "Luca.components.SimpleCollectionView"
simple.extends            "Luca.CollectionView"

simple.defines
  filterable: false
  paginatable: false
  sortable: false
  loadMask: false