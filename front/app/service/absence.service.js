export class AbsenceService {
  constructor ($http, API_URL, publicPath) {
    this.$http = $http
    this.apiUrl = API_URL + publicPath + "absences"
  }

  listerAbsences () {
    let absences = this.$http.get(this.apiUrl)
      .then(response => response.data)

      console.log(absences);
      return absences;
  }

  listerTypesAbsence () {
    return this.$http.get(this.apiUrl + "/nouvelle-demande")
      .then(response => response.data)
  }

  parser (date) {
  	return date.dayOfMonth + " " + date.month + " " + date.year;
  }

}