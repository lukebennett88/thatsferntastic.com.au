import React, { useEffect, useMemo, useState } from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';

import { useAddItemToCart, useGraphQL, useLazyLoad } from '../hooks';
import {
  prepareVariantsWithOptions,
  prepareVariantsImages,
  resizeShopifyImage,
} from '../utils';
import { Layout, SEO, OptionPicker, Thumbnail } from '../components';

export default function ProductPageTemplate({
  data: { shopifyProduct: product },
}) {
  // Lazy load images using custom hook
  const { ref, imgRef, isImgLoaded, handleImgLoaded, Spinner } = useLazyLoad();

  // Get all possible extras
  const extras =
    product.options.find((option) => option.name.toLowerCase() === 'extras')
      ?.values || [];

  // Get all possible sizes
  const sizes =
    product.options.find((option) => option.name.toLowerCase() === 'size')
      ?.values || [];

  // Format the data we get back from GraphQL for variants to be a little easier to work with
  // See comment in `prepare-variants-with-options.js`
  const variants = useMemo(() => prepareVariantsWithOptions(product.variants), [
    product.variants,
  ]);

  // Keep variants in state, and set the default variant to be the first available item
  const [variant, setVariant] = useState(
    variants.find((v) => v.availableForSale === true) || variants[0]
  );

  // Format the data we get back from GraphQL for images to be a little easier to work with
  // See comment in `prepare-variants-images.js`
  const images = useMemo(() => prepareVariantsImages(variants, 'extras'), [
    variants,
  ]);

  // Keep different extras options in state
  const [extra, setExtra] = useState(variant.extra);

  // Keep different sizes in state
  const [size, setSize] = useState(variant.size);

  const [addToCartDisabled, setAddToCartDisabled] = useState(false);

  // Manage add to cart alerts in state
  const [isAlertShown, setIsAlertShown] = useState(false);

  // Use a custom hook for adding items to cart
  const addItemToCart = useAddItemToCart();

  // Whenever we add an item to the cart, also create an alert to notify the customer of this
  // Note: we are hard coding the number of items to be added to cart as 1, we can add another useState instance to address this in the future if we need to
  function handleAddToCart() {
    addItemToCart(variant.shopifyId, 1);
    setIsAlertShown(true);
  }

  // This handles adding the correct variant to the cart
  useEffect(() => {
    // Try to find the variant with selected size and extras
    const newVariant = variants.find((v) => {
      return v.size === size && v.extras === extra;
    });

    if (typeof newVariant === 'object') {
      setVariant(newVariant);
      setAddToCartDisabled(false);
      if (!newVariant.availableForSale) {
        // If variant exists but is not available for sale
        setAddToCartDisabled(true);
      }
    } else {
      // If variant doesn't exist
      setAddToCartDisabled(true);
    }
  }, [size, extra, variants, variant.shopifyId]);

  // If product doesn't have an image, we can use a placeholder
  const { placeholderImage } = useGraphQL();

  // Keep source for primary image in state
  const [imgSrc, setImgSrc] = useState(placeholderImage.publicURL);

  // Update the primary image whenever the variant changes
  useEffect(() => {
    if (variant.image) {
      setImgSrc(
        resizeShopifyImage({ url: variant.image.originalSrc, width: 800 })
      );
      imgRef.current.src = imgSrc;
    }
  }, [variant, imgSrc, imgRef]);

  return (
    <Layout hasSidebar={false}>
      <SEO
        title={product.title}
        image={variant.image && variant.image.originalSrc}
      />
      <article className="relative">
        <div className="rounded-lg md:grid md:grid-cols-2 md:gap-8">
          <h1 className="mt-6 text-lg font-bold leading-tight md:hidden">
            {product.title}
          </h1>
          <div className="grid gap-6 mt-6 md:mt-0">
            <div
              ref={ref}
              className="relative w-full h-0 overflow-hidden bg-white rounded-lg aspect-ratio-square"
            >
              <img
                ref={imgRef}
                data-src={imgSrc}
                onLoad={handleImgLoaded}
                alt=""
                width={592}
                height={592}
                className="absolute inset-0 object-contain w-full h-full mx-auto overflow-hidden duration-500 ease-in-out transform rounded-lg hover:scale-110"
              />
              {!isImgLoaded && <Spinner />}
            </div>
            {images.length > 1 && (
              <div className="grid grid-cols-3 gap-6">
                {images.map((img) => (
                  <Thumbnail
                    key={img.extras}
                    src={img.src}
                    onClick={() => {
                      setExtra(img.extras);
                    }}
                  />
                ))}
              </div>
            )}
          </div>
          <div className="space-y-4">
            <h1 className="hidden text-lg font-bold leading-tight md:block">
              {product.title}
            </h1>
            <div className="font-bold">${variant.price}</div>
            {product.availableForSale &&
              (extras.length > 1 || sizes.length > 1) && (
                <div className="grid gap-4 mt-6 sm:grid-cols-2">
                  <OptionPicker
                    name="Extras"
                    options={extras}
                    selected={extra}
                    onChange={(event) => setExtra(event.target.value)}
                  />
                  <OptionPicker
                    name="Size"
                    options={sizes}
                    selected={size}
                    onChange={(event) => setSize(event.target.value)}
                  />
                </div>
              )}
            <span className="relative inline-flex transition duration-300 ease-in-out transform rounded-full shadow-sm hover:-translate-y-1 hover:shadow-lg">
              <button
                onClick={handleAddToCart}
                type="button"
                className="inline-flex items-center justify-center w-full px-6 py-3 font-mono text-xl font-bold leading-6 text-pink-700 lowercase transition duration-150 ease-in-out bg-pink-100 border border-transparent rounded-full shadow-sm hover:bg-pink-50 focus:outline-none focus:border-pink-300 focus:shadow-outline-pink active:bg-pink-200 hover:shadow-lg"
              >
                Add to Cart
              </button>
            </span>
            <div
              dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
              className="grid row-gap-4 mt-6 text-base leading-6 text-gray-700"
            />
          </div>
        </div>
      </article>
    </Layout>
  );
}

ProductPageTemplate.propTypes = {
  data: PropTypes.object,
};

export const ProductPageTemplateQuery = graphql`
  query productPage($productId: String!) {
    shopifyProduct(id: { eq: $productId }) {
      availableForSale
      id
      title
      descriptionHtml
      options {
        name
        values
      }
      variants {
        availableForSale
        id
        price
        shopifyId
        sku
        title
        selectedOptions {
          name
          value
        }
        image {
          originalSrc
        }
      }
    }
  }
`;
