import productImgDesktop from './assets/image-product-desktop.jpg'
import productImgMobile from './assets/image-product-mobile.jpg'
import svgCart from './assets/icon-cart.svg'

function App() {

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cream">
      <main className='max-w-5xl flex flex-col lg:flex-row rounded-2xl m-10 border-2 border-black bg-white'>
      <picture>
        <source srcSet={productImgMobile} media="(max-width: 1024px)" />
        <source srcSet={productImgDesktop} media="(min-width: 1025px)" />
        <img className='rounded-t-2xl lg:rounded--2xl lg:rounded-tr-none w-full lg:h-full' src={productImgMobile} alt="product image" />
      </picture>


        <div className='flex flex-col justify-between p-10 max-w-xl'>
        <div className='flex flex-col justify-evenly gap-7 mb-6 '>
          <h5 className='font-montserrat uppercase font-medium tracking-extra-widest text-darkGrayisBlue'>
            Perfume
            </h5>
          <h1 className='font-fraunces text-3xl md:text-5xl font-bold lg:text-6xl'>
            Gabrielle Essence Eau De Parfum
          </h1>
          <p className='text-darkGrayisBlue font-montserrat text-sm md:text-xl font-medium leading-8 lg:text-2xl'
          >
          A floral, solar and voluptuous interpretation composed by Olivier Polge, Perfumer-Creator for the House of CHANEL.
          </p>
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <h2 className='text-darkCyan font-bold font-fraunces text-2xl md:text-5xl grid-'>
              $149.99
              </h2>
            <p className='flex items-center font-fraunces line-through text-darkGrayisBlue text-xl '>
              $169.99
              </p>
            <button className='flex justify-center items-center gap-2 font-bold text-xl col-span-2 bg-darkCyan rounded-2xl 
            p-5 text-white font-montserrat hover:bg-veryDarkBlue'
            >
              <img src={svgCart}/>
              Add to Cart
              </button>
          </div>
        </div>
      </main>

    </div>
  )
}

export default App
