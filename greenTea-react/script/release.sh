rm -rf ./build
npm run compile
mkdir ./build/packed
npm pack --pack-destination ./build/packed/
mv ./build/packed/*.tgz ./build/packed/package.tgz
