/**
 * SoundBox API to be used for this game.
 * The game muisc is created using musicEditor: https://xem.github.io/miniOrchestra/
 * And, all other sound-FX are generated from https://xem.github.io/MiniSoundEditor/ 
 */

export const Sound = (() =>{
	let isMusicPlaying = false;
	const A = new AudioContext();
	const G = A.createGain();
	/**
	 * @type {AudioContext[]}
	 */
	const musicAudioContexts = [];
	const musicTimers = [];
	let focused = true;

	window.addEventListener('focus', () => {
		focused = true;
		pauseMusic(false);
	});
	window.addEventListener('blur', () => {
		focused = false;
		pauseMusic();
	});

	function t(i,n) {
		return (n-i)/n;
	}

	/**
	 * @param {Function} soundFx
	 * @param {number} volume
	 */
	function _audio(soundFx, volume) {
		G.gain.value = volume || 1;
		G.connect(A.destination);
		const m = A.createBuffer(1,96e3,48e3);
		const b = m.getChannelData(0);
		for(var i = 96e3; i--;)b[i] = soundFx(i);
		const s = A.createBufferSource();
		s.buffer = m;
		s.connect(G);
		s.start();
	}

	function _fxPunch(i) {
		var n=2e4;
		if (i > n) return null;
		var q = t(i,n);
		return (Math.pow(i*30,0.3)&33)?q:-q;
	}

	function _fxPistol(i) {
		var n = 2e4;
		if (i > n) return null;
		var q = t(i,n);
		return (Math.pow(i*500000,0.3)&33)?q:-q;
	}

	function _fxTele(i) {
		var n = 2e4;
		if (i > n) return null;
		var q = t(i,n);
		i = i*0.7;
		return (Math.pow(i*50,0.8)&133)?q:-q;
	}

	function _fxSpawnD(i) {
		var n=1.3e4;
		var c=n/3;
		if (i > n) return null;
		var q=Math.pow(t(i,n),3.1);
		return (Math.pow(i,1.08)&(i<c?98:99))?q:-q;
	}

	function _fxSuperT(i) {
		var n = 25000;
		if (i > n) return null;
		return ((((i^(i>>3))^(i*i*7.3)^(i<<4))&65535)/65536)*t(i,n);
	}

	function _fxPick(i) {
		i=i*1.4;
		var n = 2e4;
		if (i>n) return null;
		return ((Math.pow(i,1.055)&130)?1:-1)*Math.pow(t(i,n),2);
	}

	function _fxWin(i) {
		var notes = [0,4,7,12,undefined,7,12];
		var n=3.5e4;
		if (i > n) return null;
		var idx = ((notes.length*i)/n)|0;
		var note = notes[idx];
		if (note === undefined) return 0;
		var r = Math.pow(2,note/12)*0.8;
		var q = t((i*notes.length)%n,n);
		return ((i*r)&64)?q:-q;
	}

	function _fxLanded(i) {
		return 0.8 * (Math.random() * 2 - 1) * Math.exp(-i/800);
	}

	function createMusic(notes,center,duration,decaystart,decayduration,interval,volume,waveform,i) {
		const musicAC=new AudioContext();
		const musicGain=musicAC.createGain();
		notes.forEach(function(note){
			var O = musicAC.createOscillator();
			if ( O ){
				O.connect(musicGain);
				musicGain.connect(musicAC.destination);
				O.start(note[0]*interval);
				O.frequency.setValueAtTime(center*1.06**(13-note[1]),note[0]*interval);
				O.type=waveform;
				musicGain.gain.setValueAtTime(volume,note[0]*interval);
				musicGain.gain.setTargetAtTime(1e-5,note[0]*interval+decaystart,decayduration);
				O.stop(note[0]*interval+duration);
			}
		});
		musicAudioContexts.push(musicAC);
	}

	/**
	 * @param {string} name
	 * @returns {void}
	 */
	function play(name) {
		var soundFx = null;
		switch(name) {
		case 'fxPistol':
			soundFx = _fxPistol;
			break;
		case 'fxTele':
			soundFx = _fxTele;
			break;
		case 'fxSpawnD':
			soundFx = _fxSpawnD;
			break;
		case 'fxSuperT':
			soundFx = _fxSuperT;
			break;
		case 'fxPunch':
			soundFx = _fxPunch;
			break;
		case 'fxPick':
			soundFx = _fxPick;
			break;
		case 'fxWin':
			soundFx = _fxWin;
			break;
		case 'fxLanded':
			soundFx = _fxLanded;
			break;
		}
		if (!soundFx) { return; }
		var volume = name === 'fxPunch' ? 0.2 : 0.5;
		_audio(soundFx, volume);
	}

	function music() {
		if (isMusicPlaying) { return; }
		isMusicPlaying = true;
		startMusic();
	}

	function startMusic() {
		const timer = setTimeout(() => loopMusic(3700), 1000);
		musicTimers.push(timer);
	}

	function killMusic() {
		musicAudioContexts.forEach(a => a.close());
		musicAudioContexts.length = 0;
		musicTimers.forEach(a => clearTimeout(a));
		musicTimers.length = 0;
		isMusicPlaying = false;
	}

	function pauseMusic(pause=true) {
		musicAudioContexts.forEach(a => pause ? a.suspend() : a.resume());
	}

	/**
	 * @param {number} loopInterval
	 */
	function loopMusic(loopInterval) {
		killMusic();
		createMusic([[7,11],[2,23],[5,13],[3,11],[4,11],[6,11],[8,23],[7,23],[10,23],[9,13],[11,11],[12,11],[13,13],[15,11],[14,11],[17,13],[15,23],[16,23],[18,23],[21,11],[22,11],[17,20],[19,23],[23,13],[23,20],[24,11],[25,11],[26,13],[27,11],[28,11],[25,23],[27,23],[29,20],[20,13],[0,23],[1,20],[3,23]],100,.18,.1,.005,.2,.03,'sawtooth');

		if (!focused) pauseMusic();

		const loopTimer = setTimeout(()=> loopMusic(loopInterval), loopInterval);
		musicTimers.push(loopTimer);
	}

	return {
		play,
		music,
		killMusic,
	};
})();

