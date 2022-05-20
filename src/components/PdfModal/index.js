import React, { useEffect } from 'react'
// import AudioPlayer from 'react-h5-audio-player';
// import 'react-h5-audio-player/lib/styles.css';
import { getImg } from '../../utils/Helper';
import { Button } from '../Button';

import styles from './PdfModal.module.scss'

export const PdfModal = (props) => {

    // const {isPlay, setIsPlay} = props

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "./dflip/js/dflip.min.js";
        script.async = true;

        const script1 = document.createElement("script");
        script1.src = "./shopify.js";
        script1.async = true;

        document.body.appendChild(script);
        document.body.appendChild(script1);
    }, [])

    const handleAudioPlay = () => {
        // setIsPlay(true)
        window.open("https://wippbooks.mypinata.cloud/ipfs/QmXmz3nabtEUQS56F7djesrqP7uu4DE3jWLh1EhgNk4Kxs/", "_blank")
    }

    const handlePrint = () => {
        const iDocument = document.querySelectorAll('iframe')[0].contentWindow.document
        iDocument.querySelector('.shopify-buy__btn').click()
    }

    return (
        <div className={styles.div}>
            <h6>Wallet connected. Have a great read.</h6>
            <div className={styles.pdf}>
                <div className="_df_book" webgl="true" backgroundcolor="#C1C1C1" minwidth="auto"
                    source="https://wippbooks.mypinata.cloud/ipfs/bafybeigirmjbgh5d2x7o5sxz4qqxqkzy7ky3gtepb5iukdpcxzbqxewgti?accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbmRleGVzIjpbIjMzMDcxM2VlMThjMjRjZjVkNDJjNmIwYWExMmIzMzE3Il0sImFjY291bnRJZCI6Ijc5ZjI3ZWZlLTg3M2QtNGE1OS05ZTYwLWI5ZDJlN2RmNTgwNCIsImlhdCI6MTYzODIxMDMwMSwiZXhwIjoxNjQwODQyMTg5fQ.zpQmwoT-c4rZqlV2j4TlnaIt0u-B-9GgL-8ghMByicU"
                >
                </div>
            </div>
            <div id='product-component-1641270920361' style={{ display: 'none' }}></div>
            <div className={styles.footer}>
                <div className={styles.audio}>
                    <div>
                        <img src={getImg('icon/audio_book.png')} alt="audio book" />
                        <p>Audiobook</p>
                    </div>
                    <Button value="Listen" style={{ width: 98, height: 46 }} pink onClick={() => handleAudioPlay()} />
                </div>
                <div className={styles.audio}>
                    <div>
                        <img src={getImg('icon/demend.png')} alt="print on demend" />
                        <p>Print-on-<br />demend</p>
                    </div>
                    <Button value="Print" style={{ width: 84, height: 46 }} pink onClick={() => handlePrint()} />
                </div>
            </div>
        </div>
    )
}