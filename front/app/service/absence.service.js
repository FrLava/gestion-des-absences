export class AbsenceService {
  constructor ($http, API_URL, publicPath, LoginService, UtilisateurService, $q) {
    this.$http = $http
    this.apiUrl = API_URL + '/absences'
    this.loginService = LoginService
    this.UtilisateurService = UtilisateurService
    this.user = this.loginService.loadCookies()
    this.$q = $q
  }

  listerAbsencesUtilisateurCourant () {
    return this.$http.get(this.apiUrl + '?matricule=' + this.loginService.loadCookies().matriculeCollab)
.then(response => {
  let donnees = {}
  donnees.absences = response.data.absences.filter(absence => absence.utilisateur.id === this.loginService.loadCookies().id)
  donnees.congesPayes = response.data.congesPayes
  donnees.RTT = response.data.RTT
  console.log(donnees)
  return donnees
})
  }

  listerTypesAbsence () {
    return this.$http.get(this.apiUrl + '/nouvelle-demande')
.then(response => response.data)
  }

  parser (date) {
    let moisFrancais = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre']
		return date.dayOfMonth + ' ' + moisFrancais[date.monthValue -1] + ' ' + date.year
	}

  /**
   * Renvoi la liste d'absence de l'utilisateur dont le matricule
   * est passé en paramètre
   * 
   * @param {String} matriculeSubalterne 
   */
  listerAbsencesSubalterne (matriculeSubalterne) {

    let promiseAbsence = this.$http.get(this.apiUrl + "?matricule=" + matriculeSubalterne)
    let promiseUserId = this.UtilisateurService.getUtilisateurByMatricule(matriculeSubalterne)
    //console.log(promiseAbsence)
    //console.log(promiseUserId)

    return this.$q.all([promiseAbsence,promiseUserId])
      .then(response => {
				let donnees = {}
				donnees.absences = response[0].data.absences.filter(absence => absence.utilisateur.id === response[1][0].id)                                       
				donnees.congesPayes = response[0].data.congesPayes
				donnees.RTT = response[0].data.RTT
				return donnees
			})

      //console.log(absence)*/

      
  }
}
