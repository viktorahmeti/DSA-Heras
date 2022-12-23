let video = document.getElementById('video');
let adOverlay = document.getElementById('ad');

let ads = [
    {
        time: 2,
        type: 'image',
        url: '../assets/interrupt1.svg',
        duration: 5
    },
    {
        time: 10,
        type: 'image',
        url: '../assets/interrupt2.svg',
        duration: 5
    },
    {
        time: 20,
        type: 'image',
        url: '../assets/interrupt3.svg',
        duration: 3
    }
]

video.ontimeupdate = () => {
    //O(n)
    for(let i in ads){
        let ad = ads[i];

        if(Math.floor(video.currentTime) === ad.time){
            video.pause();
            ads.splice(i, 1);
            adOverlay.style.backgroundImage = `url('${ad.url}')`;
            adOverlay.style.display = 'block';
            setTimeout(() => {
                adOverlay.style.display = 'none';
                adOverlay.style.backgroundImage = 'unset';
                video.play();
            }, ad.type === 'image'? ad.duration*1000 : 5000);
        }
    }
}