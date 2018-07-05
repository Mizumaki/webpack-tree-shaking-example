// どこにもインポートされていないため、デッドコード
const moduleA = () => {
  console.log('moduleA');
  console.log('moduleA');
  console.log('moduleA');
  console.log('moduleA');
  console.log('moduleA');
};

const moduleB = () => {
  console.log('moduleB');
  console.log('moduleB');
  console.log('moduleB');
  console.log('moduleB');
  console.log('moduleB');
};

export { moduleA, moduleB };
