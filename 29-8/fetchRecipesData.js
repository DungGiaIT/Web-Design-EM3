async function fetchRecipesData() {
    try {
        const response = await fetch('https://dummyjson.com/recipes');
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const recipeData = data.recipes; 
        const recipeContainer = document.getElementById("recipe-container");

        recipeData.forEach(({ id, name, instructions, ingredients }) => {
            const card = document.createElement('div');
            card.className = 'recipe-card';
            card.innerHTML =`
                <h2>${name}</h2>
                <p><strong>Ingredients:</strong>${ingredients.join(', ')}</p>
                <p>
            `;
            recipeContainer.appendChild(card);
        });
    } catch (error) {
        console.log('Error fetching food data:', error);
    }
}

fetchRecipesData();

/*
output


ID: 1
Name: Classic Margherita Pizza
Price: $undefined
Instructions: Preheat the oven to 475°F (245°C)., Roll out the pizza dough and spread tomato sauce evenly., Top with slices of fresh mozzarella and fresh basil leaves., Drizzle with olive oil and season with salt and pepper., Bake in the preheated oven for 12-15 minutes or until the crust is golden brown., Slice and serve hot.
Ingredients: Pizza dough, Tomato sauce, Fresh mozzarella cheese, Fresh basil leaves, Olive oil, Salt and pepper to taste
-----------------------------------
ID: 2
Name: Vegetarian Stir-Fry
Price: $undefined
Instructions: In a wok, heat sesame oil over medium-high heat., Add minced ginger and garlic, sauté until fragrant., Add cubed tofu and stir-fry until golden brown., Add broccoli, carrots, and bell peppers. Cook until vegetables are tender-crisp., Pour soy sauce over the stir-fry and toss to combine., Serve over cooked rice.
Ingredients: Tofu, cubed, Broccoli florets, Carrots, sliced, Bell peppers, sliced, Soy sauce, Ginger, minced, Garlic, minced, Sesame oil, Cooked rice for serving
-----------------------------------
ID: 3
Name: Chocolate Chip Cookies
Price: $undefined
Instructions: Preheat the oven to 350°F (175°C)., In a bowl, cream together softened butter, brown sugar, and white sugar., Beat in eggs one at a time, then stir in vanilla extract., Combine flour, baking soda, and salt. Gradually add to the wet ingredients., Fold in chocolate chips., Drop rounded tablespoons of dough onto ungreased baking sheets., Bake for 10-12 minutes or until edges are golden brown., Allow cookies to cool on the baking sheet for a few minutes before transferring to a wire rack.
Ingredients: All-purpose flour, Butter, softened, Brown sugar, White sugar, Eggs, Vanilla extract, Baking soda, Salt, Chocolate chips
-----------------------------------
ID: 4
Name: Chicken Alfredo Pasta
Price: $undefined
Instructions: Cook fettuccine pasta according to package instructions., In a pan, sauté sliced chicken in butter until fully cooked., Add minced garlic and cook until fragrant., Pour in heavy cream and grated Parmesan cheese. Stir until the cheese is melted., Season with salt and pepper to taste., Combine the Alfredo sauce with cooked pasta., Garnish with fresh parsley before serving.
Ingredients: Fettuccine pasta, Chicken breast, sliced, Heavy cream, Parmesan cheese, grated, Garlic, minced, Butter, Salt and pepper to taste, Fresh parsley for garnish
-----------------------------------
ID: 5
Name: Mango Salsa Chicken
Price: $undefined
Instructions: Season chicken thighs with salt and pepper., Grill or bake chicken until fully cooked., In a bowl, combine diced mango, chopped red onion, cilantro, minced jalapeño, and lime juice., Dice the cooked chicken and mix it with the mango salsa., Serve over cooked rice.
Ingredients: Chicken thighs, Mango, diced, Red onion, finely chopped, Cilantro, chopped, Lime juice, Jalapeño, minced, Salt and pepper to taste, Cooked rice for serving
-----------------------------------
ID: 6
Name: Quinoa Salad with Avocado
Price: $undefined
Instructions: In a large bowl, combine cooked quinoa, diced avocado, halved cherry tomatoes, diced cucumber, diced red bell pepper, and crumbled feta cheese., Drizzle with lemon vinaigrette dressing and toss to combine., Season with salt and pepper to taste., Chill in the refrigerator before serving.
Ingredients: Quinoa, cooked, Avocado, diced, Cherry tomatoes, halved, Cucumber, diced, Red bell pepper, diced, Feta cheese, crumbled, Lemon vinaigrette dressing, Salt and pepper to taste
-----------------------------------
ID: 7
Name: Tomato Basil Bruschetta
Price: $undefined
Instructions: Preheat the oven to 375°F (190°C)., Place baguette slices on a baking sheet and toast in the oven until golden brown., In a bowl, combine diced tomatoes, chopped fresh basil, minced garlic, and a drizzle of olive oil., Season with salt and pepper to taste., Top each toasted baguette slice with the tomato-basil mixture., Drizzle with balsamic glaze before serving.
Ingredients: Baguette, sliced, Tomatoes, diced, Fresh basil, chopped, Garlic cloves, minced, Balsamic glaze, Olive oil, Salt and pepper to taste
-----------------------------------
ID: 8
Name: Beef and Broccoli Stir-Fry
Price: $undefined
Instructions: In a bowl, mix soy sauce, oyster sauce, sesame oil, and cornstarch to create the sauce., In a wok, stir-fry thinly sliced beef until browned. Remove from the wok., Stir-fry broccoli florets, minced garlic, and minced ginger in the same wok., Add the cooked beef back to the wok and pour the sauce over the mixture., Stir until everything is coated and heated through., Serve over cooked white rice.
Ingredients: Beef sirloin, thinly sliced, Broccoli florets, Soy sauce, Oyster sauce, Sesame oil, Garlic, minced, Ginger, minced, Cornstarch, Cooked white rice for serving
-----------------------------------
ID: 9
Name: Caprese Salad
Price: $undefined
Instructions: Arrange alternating slices of tomatoes and fresh mozzarella on a serving platter., Tuck fresh basil leaves between the slices., Drizzle with balsamic glaze and extra virgin olive oil., Season with salt and pepper to taste., Serve immediately as a refreshing salad.
Ingredients: Tomatoes, sliced, Fresh mozzarella cheese, sliced, Fresh basil leaves, Balsamic glaze, Extra virgin olive oil, Salt and pepper to taste
-----------------------------------
ID: 10
Name: Shrimp Scampi Pasta
Price: $undefined
Instructions: Cook linguine pasta according to package instructions., In a skillet, sauté minced garlic in olive oil until fragrant., Add shrimp and cook until pink and opaque., Pour in white wine and lemon juice. Simmer until the sauce slightly thickens., Season with red pepper flakes, salt, and pepper., Toss cooked linguine in the shrimp scampi sauce., Garnish with chopped fresh parsley before serving.
Ingredients: Linguine pasta, Shrimp, peeled and deveined, Garlic, minced, White wine, Lemon juice, Red pepper flakes, Fresh parsley, chopped, Salt and pepper to taste
-----------------------------------
ID: 11
Name: Chicken Biryani
Price: $undefined
Instructions: Marinate chicken with yogurt, ginger-garlic paste, biryani masala, and salt., In a pot, sauté sliced onions until golden brown. Remove half for later use., Layer marinated chicken, chopped tomatoes, half of the fried onions, and rice in the pot., Top with ghee, green chilies, fresh coriander leaves, mint leaves, and the remaining fried onions., Cover and cook on low heat until the rice is fully cooked and aromatic., Serve hot, garnished with additional coriander and mint leaves.
Ingredients: Basmati rice, Chicken, cut into pieces, Onions, thinly sliced, Tomatoes, chopped, Yogurt, Ginger-garlic paste, Biryani masala, Green chilies, sliced, Fresh coriander leaves, Mint leaves, Ghee, Salt to taste
-----------------------------------
ID: 12
Name: Chicken Karahi
Price: $undefined
Instructions: In a wok (karahi), heat cooking oil and sauté minced garlic until golden brown., Add chicken pieces and cook until browned on all sides., Add chopped tomatoes, green chilies, ginger, and spices. Cook until tomatoes are soft., Cover and simmer until the chicken is tender and the oil separates from the masala., Garnish with fresh coriander leaves and serve hot with naan or rice.
Ingredients: Chicken, cut into pieces, Tomatoes, chopped, Green chilies, sliced, Ginger, julienned, Garlic, minced, Coriander powder, Cumin powder, Red chili powder, Garam masala, Cooking oil, Fresh coriander leaves, Salt to taste
-----------------------------------
ID: 13
Name: Aloo Keema
Price: $undefined
Instructions: In a pan, heat cooking oil and sauté chopped onions until golden brown., Add ginger-garlic paste and sauté until fragrant., Add ground beef and cook until browned. Drain excess oil if needed., Add diced potatoes, chopped tomatoes, and spices. Mix well., Cover and simmer until the potatoes are tender and the masala is well-cooked., Garnish with fresh coriander leaves and serve hot with naan or rice.
Ingredients: Ground beef, Potatoes, peeled and diced, Onions, finely chopped, Tomatoes, chopped, Ginger-garlic paste, Cumin powder, Coriander powder, Turmeric powder, Red chili powder, Cooking oil, Fresh coriander leaves, Salt to taste
-----------------------------------
ID: 14
Name: Chapli Kebabs
Price: $undefined
Instructions: In a large bowl, mix ground beef, chopped onions, tomatoes, green chilies, coriander leaves, and pomegranate seeds., Add ginger-garlic paste, cumin powder, coriander powder, red chili powder, and salt. Mix well., Add an egg to bind the mixture and form into round flat kebabs., Heat cooking oil in a pan and shallow fry the kebabs until browned on both sides., Serve hot with naan or mint chutney.
Ingredients: Ground beef, Onions, finely chopped, Tomatoes, finely chopped, Green chilies, chopped, Coriander leaves, chopped, Pomegranate seeds, Ginger-garlic paste, Cumin powder, Coriander powder, Red chili powder, Egg, Cooking oil, Salt to taste
-----------------------------------
ID: 15
Name: Saag (Spinach) with Makki di Roti
Price: $undefined
Instructions: Boil mustard greens and spinach until tender. Drain and blend into a coarse paste., In a pan, sauté chopped onions, green chilies, and grated ginger in ghee until golden brown., Add the greens paste and cook until it thickens., Meanwhile, knead cornmeal with water to make a dough. Roll into rotis (flatbreads)., Cook the rotis on a griddle until golden brown., Serve hot saag with makki di roti and a dollop of ghee.
Ingredients: Mustard greens, washed and chopped, Spinach, washed and chopped, Cornmeal (makki ka atta), Onions, finely chopped, Green chilies, chopped, Ginger, grated, Ghee, Salt to taste
-----------------------------------
ID: 16
Name: Japanese Ramen Soup
Price: $undefined
Instructions: Cook ramen noodles according to package instructions and set aside., In a pot, combine chicken broth, soy sauce, mirin, and sesame oil. Bring to a simmer., Add sliced shiitake mushrooms and chopped bok choy. Cook until vegetables are tender., Divide the cooked noodles into serving bowls and ladle the hot broth over them., Top with green onions, soft-boiled eggs, grilled chicken slices, and nori., Serve hot and enjoy the authentic Japanese ramen!
Ingredients: Ramen noodles, Chicken broth, Soy sauce, Mirin, Sesame oil, Shiitake mushrooms, sliced, Bok choy, chopped, Green onions, sliced, Soft-boiled eggs, Grilled chicken slices, Norwegian seaweed (nori)
-----------------------------------
ID: 17
Name: Moroccan Chickpea Tagine
Price: $undefined
Instructions: In a tagine or large pot, sauté chopped onions and minced garlic until softened., Add diced carrots, chopped tomatoes, and cooked chickpeas., Season with cumin, coriander, cinnamon, and paprika. Stir to coat., Pour in vegetable broth and bring to a simmer. Cook until carrots are tender., Stir in olives and garnish with fresh cilantro before serving., Serve this flavorful Moroccan dish with couscous or crusty bread.
Ingredients: Chickpeas, cooked, Tomatoes, chopped, Carrots, diced, Onions, finely chopped, Garlic, minced, Cumin, Coriander, Cinnamon, Paprika, Vegetable broth, Olives, Fresh cilantro, chopped
-----------------------------------
ID: 18
Name: Korean Bibimbap
Price: $undefined
Instructions: Arrange cooked white rice in a bowl., Top with beef bulgogi, sautéed carrots, seasoned spinach, grilled zucchini, and blanched bean sprouts., Place a fried egg on top and drizzle with gochujang and sesame oil., Sprinkle with toasted sesame seeds before serving., Mix everything together before enjoying this delicious Korean bibimbap!, Feel free to customize with additional vegetables or protein.
Ingredients: Cooked white rice, Beef bulgogi (marinated and grilled beef slices), Carrots, julienned and sautéed, Spinach, blanched and seasoned, Zucchini, sliced and grilled, Bean sprouts, blanched, Fried egg, Gochujang (Korean red pepper paste), Sesame oil, Toasted sesame seeds
-----------------------------------
ID: 19
Name: Greek Moussaka
Price: $undefined
Instructions: Preheat oven to 375°F (190°C)., Sauté sliced eggplants in olive oil until browned. Set aside., In the same pan, cook chopped onions and minced garlic until softened., Add ground lamb or beef and brown. Stir in crushed tomatoes, red wine, and spices., In a separate saucepan, make béchamel sauce: melt butter, whisk in flour, add milk, and cook until thickened., Remove from heat and stir in Parmesan cheese and egg yolks., In a baking dish, layer eggplants and meat mixture. Top with béchamel sauce., Bake for 40-45 minutes until golden brown. Let it cool before slicing., Serve slices of moussaka warm and enjoy this Greek classic!
Ingredients: Eggplants, sliced, Ground lamb or beef, Onions, finely chopped, Garlic, minced, Tomatoes, crushed, Red wine, Cinnamon, Allspice, Nutmeg, Olive oil, Milk, Flour, Parmesan cheese, Egg yolks
-----------------------------------
ID: 20
Name: Butter Chicken (Murgh Makhani)
Price: $undefined
Instructions: Marinate chicken thighs in a mixture of yogurt, ginger-garlic paste, garam masala, and Kashmiri red chili powder., In a pan, melt butter and sauté the marinated chicken until browned., Add tomato puree and cook until the oil separates. Stir in heavy cream., Sprinkle kasuri methi, sugar, and salt. Simmer until the chicken is fully cooked., Serve this creamy butter chicken over rice or with naan for an authentic Pakistani/Indian experience.
Ingredients: Chicken thighs, boneless and skinless, Yogurt, Ginger-garlic paste, Garam masala, Kashmiri red chili powder, Tomato puree, Butter, Heavy cream, Kasuri methi (dried fenugreek leaves), Sugar, Salt to taste
-----------------------------------
ID: 21
Name: Thai Green Curry
Price: $undefined
Instructions: In a pot, simmer green curry paste in coconut milk., Add chicken, fish sauce, and sugar. Cook until chicken is tender., Stir in sliced eggplant and bell peppers. Simmer until vegetables are cooked., Garnish with fresh basil leaves., Serve hot over jasmine rice and enjoy this Thai classic!
Ingredients: Chicken thighs, boneless and skinless, Green curry paste, Coconut milk, Fish sauce, Sugar, Eggplant, sliced, Bell peppers, sliced, Basil leaves, Jasmine rice for serving
-----------------------------------
ID: 22
Name: Mango Lassi
Price: $undefined
Instructions: In a blender, combine diced mango, yogurt, milk, honey, and cardamom powder., Blend until smooth and creamy., Add ice cubes and blend again until the lassi is chilled., Pour into glasses and garnish with a sprinkle of cardamom., Enjoy this refreshing Mango Lassi!
Ingredients: Ripe mango, peeled and diced, Yogurt, Milk, Honey, Cardamom powder, Ice cubes
-----------------------------------
ID: 23
Name: Italian Tiramisu
Price: $undefined
Instructions: In a bowl, whip heavy cream until stiff peaks form., In another bowl, mix mascarpone cheese and sugar until smooth., Gently fold the whipped cream into the mascarpone mixture., Dip ladyfinger cookies into brewed espresso and layer them in a serving dish., Spread a layer of the mascarpone mixture over the cookies., Repeat layers and finish with a dusting of cocoa powder., Chill in the refrigerator for a few hours before serving., Indulge in the decadence of this classic Italian Tiramisu!
Ingredients: Espresso, brewed and cooled, Ladyfinger cookies, Mascarpone cheese, Heavy cream, Sugar, Cocoa powder
-----------------------------------
ID: 24
Name: Turkish Kebabs
Price: $undefined
Instructions: In a bowl, mix ground meat, grated onions, minced garlic, chopped parsley, and spices., Form the mixture into kebab shapes and grill until fully cooked., Serve the kebabs on flatbread with a drizzle of tahini sauce., Enjoy these flavorful Turkish Kebabs with your favorite sides.
Ingredients: Ground lamb or beef, Onions, grated, Garlic, minced, Parsley, finely chopped, Cumin, Coriander, Red pepper flakes, Salt and pepper to taste, Flatbread for serving, Tahini sauce
-----------------------------------
ID: 25
Name: Blueberry Banana Smoothie
Price: $undefined
Instructions: In a blender, combine blueberries, banana, Greek yogurt, almond milk, and honey., Blend until smooth and creamy., Add chia seeds for extra nutrition and blend briefly., Pour into a glass and enjoy this nutritious Blueberry Banana Smoothie!
Ingredients: Blueberries, fresh or frozen, Banana, peeled and sliced, Greek yogurt, Almond milk, Honey, Chia seeds (optional)
-----------------------------------
ID: 26
Name: Mexican Street Corn (Elote)
Price: $undefined
Instructions: Grill or roast corn on the cob until kernels are charred., Brush each cob with mayonnaise, then sprinkle with crumbled Cotija cheese and chili powder., Serve with lime wedges for squeezing over the top., Enjoy this delicious and flavorful Mexican Street Corn!
Ingredients: Corn on the cob, Mayonnaise, Cotija cheese, crumbled, Chili powder, Lime wedges
-----------------------------------
ID: 27
Name: Russian Borscht
Price: $undefined
Instructions: In a pot, sauté chopped onions and garlic until softened., Add shredded beets, cabbage, diced potatoes, grated carrots, and tomato paste., Pour in broth and add bay leaves. Simmer until vegetables are tender., Serve hot with a dollop of sour cream on top., Enjoy the hearty and comforting flavors of Russian Borscht!
Ingredients: Beets, peeled and shredded, Cabbage, shredded, Potatoes, diced, Onions, finely chopped, Carrots, grated, Tomato paste, Beef or vegetable broth, Garlic, minced, Bay leaves, Sour cream for serving
-----------------------------------
ID: 28
Name: South Indian Masala Dosa
Price: $undefined
Instructions: In a pan, heat ghee and add mustard seeds, cumin seeds, and curry leaves., Add chopped onions, green chilies, and turmeric powder. Sauté until onions are golden brown., Mix in boiled and mashed potatoes. Cook until well combined and seasoned., Spread dosa batter on a hot griddle to make thin pancakes., Place a spoonful of the potato mixture in the center, fold, and serve hot., Pair with coconut chutney for a delicious South Indian meal.
Ingredients: Dosa batter (fermented rice and urad dal batter), Potatoes, boiled and mashed, Onions, finely chopped, Mustard seeds, Cumin seeds, Curry leaves, Turmeric powder, Green chilies, chopped, Ghee, Coconut chutney for serving
-----------------------------------
ID: 29
Name: Lebanese Falafel Wrap
Price: $undefined
Instructions: Warm falafel balls according to package instructions., Place a generous serving of falafel in the center of each wrap., Top with diced tomatoes, sliced cucumbers, red onions, shredded lettuce, and fresh parsley., Drizzle with tahini sauce and wrap tightly., Enjoy this Lebanese Falafel Wrap filled with fresh and flavorful ingredients!
Ingredients: Falafel balls, Whole wheat or regular wraps, Tomatoes, diced, Cucumbers, sliced, Red onions, thinly sliced, Lettuce, shredded, Tahini sauce, Fresh parsley, chopped
-----------------------------------
ID: 30
Name: Brazilian Caipirinha
Price: $undefined
Instructions: In a glass, muddle lime wedges with granulated sugar to release the juice., Fill the glass with ice cubes., Pour cachaça over the ice and stir well., Sip and enjoy the refreshing taste of the Brazilian Caipirinha!, Adjust sugar and lime to suit your taste preferences.
Ingredients: Cachaça (Brazilian sugarcane spirit), Lime, cut into wedges, Granulated sugar, Ice cubes
-----------------------------------*/