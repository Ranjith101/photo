import React from 'react';
import { Provider } from 'react-redux';
import store,{addImage} from './store/store';
import PhotoGallery from './components/photoGallery';
import PhotoUpload from './components/PhotoUpload';

const App = () => {
  React.useEffect(() => {
    store.dispatch(
      addImage({
        id: 'image1',
        src:
          'https://images.pexels.com/photos/1037992/pexels-photo-1037992.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      })
    );
    
    store.dispatch(
      addImage({
        id: 'image2',
        src:
          'https://images.pexels.com/photos/1961778/pexels-photo-1961778.jpeg?auto=compress&cs=tinysrgb&w=600',
      })
    );
    
    store.dispatch(
      addImage({
        id: 'image3',
        src:
          'https://images.pexels.com/photos/399161/pexels-photo-399161.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      })
    );
  }, []);
  console.log("store",store)
  return (
    <Provider store={store}>
      <PhotoGallery />
    </Provider>
  );
};

export default App;
