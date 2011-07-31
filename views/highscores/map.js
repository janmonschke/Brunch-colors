function(doc) {
  if (doc.collection && doc.collection == "games") {
    if(doc.moves_needed && doc.moves_needed > 0)
      emit(doc.moves_needed, doc);
  }
}