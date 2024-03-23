# greenTea-core
# greenTea-infrastructure
# greenTea-pixijs
# greenTea-react

rm -rf ../greenTea-core/build
rm -rf ../greenTea-infrastructure/build
rm -rf ../greenTea-pixijs/build
rm -rf ../greenTea-react/build


npm --prefix ../greenTea-infrastructure run compile
npm --prefix ../greenTea-core run compile
npm --prefix ../greenTea-pixijs run compile
npm --prefix ../greenTea-react run compile
