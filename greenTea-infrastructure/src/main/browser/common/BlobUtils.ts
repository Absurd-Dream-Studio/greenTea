export default {
    blobToFile: function (theBlob: Blob, fileName: string): File {
        var b: any = theBlob;
        //A Blob() is almost a File() - it's just missing the two properties below which we will add
        b.lastModifiedDate = new Date();
        b.name = fileName;

        //Cast to a File() type
        return <File>theBlob;
    },
    blobToImage: function (blob: Blob): Promise<HTMLImageElement> {
        return new Promise(resolve => {
            const url = URL.createObjectURL(blob)
            let img = new Image()
            img.onload = () => {
                URL.revokeObjectURL(url)
                resolve(img)
            }
            img.src = url
        })
    }
}