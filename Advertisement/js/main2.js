let video = document.getElementById('video');
let adOverlay = document.getElementById('interrupt');

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

let adsDict = new Map();

for(let i in ads){
    let ad = ads[i];
    adsDict.set(ad.time, ad);
}

video.ontimeupdate = () => {
    let ad;
    //O(1)
    if((ad = adsDict.get(Math.floor(video.currentTime))) != null){
        video.pause();
            adsDict.delete(ad.time);
            adOverlay.style.backgroundImage = `url('${ad.url}')`;
            adOverlay.style.display = 'block';
            setTimeout(() => {
                adOverlay.style.display = 'none';
                adOverlay.style.backgroundImage = 'unset';
                video.play();
            }, ad.type === 'image'? ad.duration*1000 : 5000);
    }
}