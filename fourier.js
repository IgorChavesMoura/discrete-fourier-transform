function dft(x){

    let X = [];

    const N = x.length;

    for(let k = 0; k < N; k++){

        let re = 0;  //Real Component
        let im = 0; //Imaginary Component

        for(let n = 0; n < N; n++){

            let phi = ((2 * Math.PI) * k * n)/N;

            re += x[n] * Math.cos(phi);
            im -= x[n] * Math.sin(phi);

        }

        re = re/N;
        im = im/N;

        let freq = k;
        let amp = Math.sqrt(re*re + im*im);
        let phase = Math.atan2(im,re);

        X[k] = {
            re,
            im,
            freq,
            amp,
            phase
        };

    }

    return X;

}