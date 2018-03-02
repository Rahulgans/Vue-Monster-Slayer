

new Vue({
	el: '#app',
	data:{

		playerHealth:100,
		monsterHealth:100,
		specialPower:2,
		isSpecial:false,
		healCount:2,
		alert : false,
		healAlert:false,
		turns:[],
		gameRunning:false
	},
	methods:{

		startGameAction(){

			this.playerHealth = 100;
			this.monsterHealth = 100;

			this.gameRunning = true;
			this.turns = [];
		
		},
		monsterAttack(){

			// ASSUMING MONSTER ATTACKS ARE MORE POWERFUL THAN PLAYER
			let minimumDamage = 5 ;
			let maximumDamage = 13;

			let damage = this.doDamage(minimumDamage,maximumDamage);

			this.playerHealth -= damage;

			this.turns.unshift({
					isPlayer:false,
					text:'Monster attacks for ' + damage
			})

		},

		attackAction(){

			//WHEN PLAYER ATTACKSs 
			let minimumDamage = 3 ;
			let maximumDamage = 10;


			let damage = this.doDamage(minimumDamage,maximumDamage);

			this.monsterHealth -= damage;

			this.turns.unshift({
					isPlayer:true,
					text:'Player attack for ' + damage
			})

			if(this.checkWon()){

				return;
			}

			this.checkWon();

			this.monsterAttack();

		},
		specialAction(){

			if(this.specialPower > 0){

				let minimumDamage = 15 ;
				let maximumDamage = 20;

				let damage = this.doDamage(minimumDamage,maximumDamage);

				this.monsterHealth -= damage

				this.isSpecial = true;

				this.monsterAttack();

				this.specialPower -= 1 ;

				this.turns.unshift({
					isPlayer:true,
					text:'Player does a special attack for ' + damage
				})

				console.log(this.specialPower);

				setTimeout(() => {

           			 this.isSpecial = false;

        		}, 2000);

        		if(this.checkWon()){

					return;
				}

			}

			else{

				this.alert = true;

				setTimeout(() => {

           			 this.alert = false;
           			 
        		}, 2000);
			}
				
		},
		healAction(){
			
			if(this.playerHealth <=90 && this.healCount !== 0){

				this.playerHealth += 10 ;

				this.healCount -- ;
			}

			else if (this.healCount == 0){

				this.healAlert = true;

				setTimeout(() => {

           			 this.healAlert = false;
           			 
        		}, 2000);

			}
			
		},
		giveupAction(){
			
			if(confirm('Are you sure? Because champions never quit')){

				alert('You lost');
				this.turns = [];
				this.gameRunning = false;

			}

			else {

				return;
			}
				

		},
		doDamage(min,max){

			return Math.max(Math.floor(Math.random()*(max)+1),min);
		},
		checkWon(){
			
			if(this.playerHealth <= 0) {
				
				if(confirm('You lost! Try new Game?')){

					this.startGameAction();
				}
				else{

					this.gameRunning = false;
				}

				return true;
			}

			else if (this.monsterHealth <= 0){

				if(confirm('You Won ! New Game ? ')){

					this.startGameAction();
				}

				else{

					this.gameRunning = false;
				}

				return false;

			}

		}

	}
})