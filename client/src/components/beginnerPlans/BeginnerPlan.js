import React, { useState } from 'react';
import './beginnerPlan.css';
import ContactForm from './ContactForm';

export default function BeginnerPlan() {
  return (
    <div className="beginner">
      <div className="wrapper__beginnerPlan">
        <header>BEGINNER PLANS</header>

        <input type="radio" name="slider" id="loose" checked />
        <input type="radio" name="slider" id="gain" />

        <div className="beginnerNav">
          <label htmlFor="loose" className="loose">
            Loose Weight
          </label>
          <label htmlFor="gain" className="gain">
            Gain Weight
          </label>

          <div className="slider"></div>
        </div>
        <section className="beginnerSection">
          <div className="content content-1">
            <div className="plans">
              <div className="workoutPlan">
                <h2>WorkOut</h2>
                <div className=" meal workout_day">
                  <h3 className="day">Day 1: Monday</h3>
                  <ul className="exerciseList">
                    <li className="exercise">Chest</li>
                    <li className="exercise">Shoulders</li>
                    <li className="exercise">Triceps</li>
                  </ul>
                </div>
                <div className=" meal workout_day">
                  <h3 className="day">Day 2: Tuesday</h3>
                  <ul className="exerciseList">
                    <li className="exercise">Back</li>
                    <li className="exercise">Biceps</li>
                  </ul>
                </div>
                <div className=" meal workout_day">
                  <h3 className="day">Day 3: Wednesday</h3>
                  <ul className="exerciseList">
                    <li className="exercise">Legs</li>
                  </ul>
                </div>
                <div className=" meal workout_day">
                  <h3 className="day">Day 4: Thursday</h3>
                  <ul className="exerciseList">
                    <li className="exercise">Shouders</li>
                    <li className="exercise">Chest</li>
                    <li className="exercise">Triceps</li>
                  </ul>
                </div>
                <div className=" meal workout_day">
                  <h3 className="day">Day 5: Friday</h3>
                  <ul className="exerciseList">
                    <li className="exercise">Back</li>
                    <li className="exercise">Bis</li>
                  </ul>
                </div>
              </div>

              <div className="dietPlan">
                <h2>Diet</h2>
                <div className="diet_day">
                  <h3 className="day">Monday</h3>
                  <div className="meal">
                    <h4 className="mealName">Breakfast</h4>
                    <ul className="mealItemsCollection">
                      <li className="mealitem">
                        1/2 cup egg whites scrambled with 1 teaspoon olive oil,
                        1 teaspoon chopped basil, <br />1 teaspoon grated
                        Parmesan, and 1/2 cup cherry tomatoes
                      </li>
                      <li className="mealitem">1 slice whole-grain toast</li>
                      <li className="mealitem">1/2 cup blueberries</li>
                      <li className="mealitem">1 cup skim milk</li>
                    </ul>
                  </div>
                  <div className="meal">
                    <h4 className="mealName">Snack</h4>
                    <ul className="mealItemsCollection">
                      <li className="mealitem">
                        1/2 cup fat-free Greek yogurt topped with 1/4 cup sliced
                        strawberries
                      </li>
                    </ul>
                  </div>
                  <div className="meal">
                    <h4 className="mealName">Lunch</h4>
                    <ul className="mealItemsCollection">
                      <li className="mealitem">
                        Salad made with: 3/4 cup cooked bulgur, 4 ounces chopped
                        grilled chicken breast, 1 tablespoon shredded low-fat
                        cheddar, diced grilled veggies (2 tablespoons onion, 1/4
                        cup diced zucchini, 1/2 cup bell pepper), 1 teaspoon
                        chopped cilantro, and 1 tablespoon low-fat vinaigrette
                        (check out these other{' '}
                        <a
                          href="https://www.shape.com/healthy-eating/healthy-recipes/buddha-bowl-ideas-vegetarian-lunch-recipes"
                          target="_blank"
                          rel="noreferrer"
                        >
                          {' '}
                          Buddha bowl recipes{' '}
                        </a>
                         too.)
                      </li>
                    </ul>
                  </div>

                  <div className="meal">
                    <h4 className="mealName">Snack (2)</h4>
                    <ul className="mealItemsCollection">
                      <li className="mealitem">
                        2 tablespoons hummus and 6 baby carrots
                      </li>
                    </ul>
                  </div>
                  <div className="meal">
                    <h4 className="mealName">Dinner</h4>
                    <ul className="mealItemsCollection">
                      <li className="mealitem">4 ounces grilled salmon</li>
                      <li className="mealitem">
                        1 cup wild rice with 1 tablespoon slivered toasted
                        almonds
                      </li>
                      <li className="mealitem">
                        1 cup wilted baby spinach with 1 teaspoon each olive
                        oil, balsamic vinegar, and grated Parmesan
                      </li>
                      <li className="mealitem">
                        1/2 cup diced cantaloupe topped with
                      </li>
                      <li className="mealitem">
                        1/2 cup all-fruit raspberry sorbet and 1 teaspoon
                        chopped walnuts
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="diet_day">
                  <h3 className="day">Wednesday</h3>
                  <div className="meal">
                    <h4 className="mealName">Breakfast</h4>
                    <ul className="mealItemsCollection">
                      <li className="mealitem">
                        Omelet made with 4 egg whites and 1 whole egg, 1/4 cup
                        chopped broccoli, 2 tablespoons each fat-free refried
                        beans, diced onion, diced mushrooms, and salsa
                      </li>
                      <li className="mealitem">
                        Quesadilla made with 1/2 of one small corn tortilla and
                        1 tablespoon low-fat jack cheese
                      </li>
                      <li className="mealitem">1/2 cup diced watermelon</li>
                    </ul>
                  </div>
                  <div className="meal">
                    <h4 className="mealName">Snack</h4>
                    <ul className="mealItemsCollection">
                      <li className="mealitem">
                        1/2 cup fat-free vanilla yogurt with 1 sliced apple and
                        1 tablespoon chopped walnuts
                      </li>
                    </ul>
                  </div>
                  <div className="meal">
                    <h4 className="mealName">Lunch</h4>
                    <ul className="mealItemsCollection">
                      <li className="mealitem">
                        Salad made with 2 cups chopped Romaine, 4 ounces grilled
                        chicken, 1/2 cup chopped celery, 1/2 cup diced
                        mushrooms, 2 tablespoons shredded low-fat cheddar, and 1
                        tablespoon low-fat Caesar dressing
                      </li>
                      <li className="mealitem">1 medium nectarine</li>
                      <li className="mealitem">1 cup skim milk</li>
                    </ul>
                  </div>
                  <div className="meal">
                    <h4 className="mealName">Snack (2)</h4>
                    <ul className="mealItemsCollection">
                      <li className="mealitem">
                        1 fat-free mozzarella string cheese stick
                      </li>
                      <li className="mealitem">1 medium orange</li>
                    </ul>
                  </div>
                  <div className="meal">
                    <h4 className="mealName">Dinner</h4>
                    <ul className="mealItemsCollection">
                      <li className="mealitem">
                        4 ounces shrimp, grilled or sauteed with 1 teaspoon
                        olive oil and 1 teaspoon chopped garlic
                      </li>
                      <li className="mealitem">1 medium artichoke, steamed</li>
                      <li className="mealitem">
                        1/2 cup whole wheat couscous with 2 tablespoons diced
                        bell pepper, 1/4 cup garbanzo beans, 1 teaspoon chopped
                        fresh cilantro, and 1 tablespoon fat-free honey mustard
                        dressing
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="diet_day">
                  <h3 className="day">Friday</h3>
                  <div className="meal">
                    <h4 className="mealName">Breakfast</h4>
                    <ul className="mealItemsCollection">
                      <li className="mealitem">
                        Burrito made with: 1 medium whole wheat tortilla, 4
                        scrambled egg whites, 1 teaspoon olive oil, 1/4 cup
                        fat-free refried black beans, 2 tablespoons salsa, 2
                        tablespoons grated low-fat cheddar, and 1 teaspoon fresh
                        cilantro
                      </li>
                      <li className="mealitem">1 cup mixed melon</li>
                    </ul>
                  </div>
                  <div className="meal">
                    <h4 className="mealName">Snack</h4>
                    <ul className="mealItemsCollection">
                      <li className="mealitem">3 ounces sliced lean ham</li>
                      <li className="mealitem">1 medium apple</li>
                    </ul>
                  </div>
                  <div className="meal">
                    <h4 className="mealName">Lunch</h4>
                    <ul className="mealItemsCollection">
                      <li className="mealitem">
                        Turkey burger (or one of these{' '}
                        <a
                          href="https://www.shape.com/healthy-eating/healthy-recipes/crazy-good-burger-recipes-vegetarian-cookout"
                          target="_blank"
                          rel="noreferrer"
                        >
                          veggie burgers
                        </a>
                         )
                      </li>
                      <li className="mealitem">
                        Salad made with: 1 cup baby spinach, 1/4 cup halved
                        cherry tomatoes, 1/2 cup cooked lentils, 2 teaspoons
                        grated Parmesan, and 1 tablespoon light Russian dressing
                      </li>
                      <li className="mealitem">1 cup skim milk</li>
                    </ul>
                  </div>
                  <div className="meal">
                    <h4 className="mealName">Snack (2)</h4>
                    <ul className="mealItemsCollection">
                      <li className="mealitem">
                        1 fat-free mozzarella string cheese stick
                      </li>
                      <li className="mealitem">1 cup red grapes</li>
                    </ul>
                  </div>
                  <div className="meal">
                    <h4 className="mealName">Dinner</h4>
                    <ul className="mealItemsCollection">
                      <li className="mealitem">5 ounces grilled wild salmon</li>
                      <li className="mealitem">1/2 cup brown or wild rice</li>
                      <li className="mealitem">
                        2 cups mixed baby greens with 1 tablespoon low-fat
                        Caesar dressing
                      </li>
                      <li className="mealitem">
                        1/2 cup all-fruit strawberry sorbet with 1 sliced pear
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="content content-2">
            <div className="plans">
              <div className="workoutPlan">
                <h2>WorkOut</h2>
                <div className=" meal workout_day">
                  <h3 className="day">Day 1: Monday</h3>
                  <ul className="exerciseList">
                    <li className="exercise">Chest</li>
                    <li className="exercise">Triceps</li>
                  </ul>
                </div>
                <div className=" meal workout_day">
                  <h3 className="day">Day 2: Tuesday</h3>
                  <ul className="exerciseList">
                    <li className="exercise">Back</li>
                    <li className="exercise">Biceps</li>
                  </ul>
                </div>
                <div className=" meal workout_day">
                  <h3 className="day">Day 3: Wednesday</h3>
                  <ul className="exerciseList">
                    <li className="exercise">Rest</li>

                    <li className="exercise">Cardio</li>
                  </ul>
                </div>
                <div className=" meal workout_day">
                  <h3 className="day">Day 4: Thursday</h3>
                  <ul className="exerciseList">
                    <li className="exercise">Shouders</li>
                    <li className="exercise">Forearms</li>
                  </ul>
                </div>
                <div className=" meal workout_day">
                  <h3 className="day">Day 5: Friday</h3>
                  <ul className="exerciseList">
                    <li className="exercise">Legs</li>
                  </ul>
                </div>
              </div>

              <div className="dietPlan">
                <h2>Diet</h2>
                <div className="diet_day">
                  <h3 className="day">Monday</h3>
                  <div className="meal">
                    <h4 className="mealName">Breakfast</h4>
                    <ul className="mealItemsCollection">
                      <li className="mealitem">
                         1 cup (80 grams) of oats with 1 cup (240 ml) of dairy
                        or{' '}
                        <a
                          target="_blank"
                          rel="noreferrer"
                          href="https://www.healthline.com/nutrition/best-milk-substitutes"
                        >
                           plant-based milk
                        </a>
                        , 1 sliced banana, and 2 tablespoons (33 grams) of
                        peanut butter
                      </li>
                    </ul>
                  </div>
                  <div className="meal">
                    <h4 className="mealName">Snack</h4>
                    <ul className="mealItemsCollection">
                      <li className="mealitem">
                         Trail mix made with 1 cup (80 grams) of dry cereal, 1/4
                        cup (30 grams) of granola, 1/4 cup (34 grams) of dried
                        fruit, and 20 nuts
                      </li>
                    </ul>
                  </div>
                  <div className="meal">
                    <h4 className="mealName">Lunch</h4>
                    <ul className="mealItemsCollection">
                      <li className="mealitem">
                        1 cup (100 grams) of spaghetti with 3/4 cups (183 grams)
                        of tomato sauce and 4 ounces (112 grams) of cooked
                        ground beef, as well as 1 medium breadstick with 1
                        tablespoon (14 grams) of butter
                      </li>
                    </ul>
                  </div>

                  <div className="meal">
                    <h4 className="mealName">Snack (2)</h4>
                    <ul className="mealItemsCollection">
                      <li className="mealitem">
                        1 cup (226 grams) of cottage cheese and 1/2 cup (70
                        grams) of blueberries
                      </li>
                    </ul>
                  </div>
                  <div className="meal">
                    <h4 className="mealName">Dinner</h4>
                    <ul className="mealItemsCollection">
                      <li className="mealitem">
                         4 ounces (110 grams) of salmon, 1 cup (100 grams) of
                        brown rice, and 5 asparagus spears
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="diet_day">
                  <h3 className="day">Tuesday</h3>
                  <div className="meal">
                    <h4 className="mealName">Breakfast</h4>
                    <ul className="mealItemsCollection">
                      <li className="mealitem">
                        Smoothie made with 2 cups (480 ml) of dairy or
                        plant-based milk, 1 cup (227 grams) of yogurt, 1 cup
                        (140 grams) of blueberries, and 2 tablespoons (33 grams)
                        of almond butter
                      </li>
                    </ul>
                  </div>
                  <div className="meal">
                    <h4 className="mealName">Snack</h4>
                    <ul className="mealItemsCollection">
                      <li className="mealitem">
                        1 granola bar, 1 piece of fruit, and 2 pieces of string
                        cheese
                      </li>
                    </ul>
                  </div>
                  <div className="meal">
                    <h4 className="mealName">Lunch</h4>
                    <ul className="mealItemsCollection">
                      <li className="mealitem">
                        12-inch sub sandwich with meat, cheese, and veggies with
                        3 ounces (85 grams) of baby carrots, 2 tablespoons (28
                        grams) of{' '}
                        <a
                          href="https://www.healthline.com/nutrition/is-hummus-healthy"
                          target="_blank"
                          rel="noreferrer"
                        >
                          {' '}
                          hummus
                        </a>
                         , and apple slices on the side
                      </li>
                    </ul>
                  </div>
                  <div className="meal">
                    <h4 className="mealName">Snack (2)</h4>
                    <ul className="mealItemsCollection">
                      <li className="mealitem">
                        1 scoop of whey protein powder mixed in 1 cup (240 ml)
                        of dairy or plant-based milk
                      </li>
                    </ul>
                  </div>
                  <div className="meal">
                    <h4 className="mealName">Dinner</h4>
                    <ul className="mealItemsCollection">
                      <li className="mealitem">
                        4-ounce (113-gram) sirloin steak, 1 medium-sized
                        (173-gram) baked potato with 1 tablespoon (14 grams) of
                        butter, and 1 cup (85 grams) of broccoli
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="diet_day">
                  <h3 className="day">Wednesday</h3>
                  <div className="meal">
                    <h4 className="mealName">Breakfast</h4>
                    <ul className="mealItemsCollection">
                      <li className="mealitem">
                        3 whole-wheat waffles with 2 tablespoons (33 grams) of
                        peanut butter, 1 orange, and 2 cups (480 ml) of dairy or
                        plant-based milk
                      </li>
                    </ul>
                  </div>
                  <div className="meal">
                    <h4 className="mealName">Snack</h4>
                    <ul className="mealItemsCollection">
                      <li className="mealitem">
                         1 nut-based granola bar and 1 ounce (28 grams) of
                        almonds
                      </li>
                    </ul>
                  </div>
                  <div className="meal">
                    <h4 className="mealName">Lunch</h4>
                    <ul className="mealItemsCollection">
                      <li className="mealitem">
                        6-ounce (170-gram) 90%-lean burger on a whole-wheat bun
                        with 1 tomato slice and lettuce leaf, as well as 1 1/2
                        cup (86 grams) of homemade{' '}
                        <a
                          href="https://www.healthline.com/nutrition/sweet-potato-fries-vs-french-fries"
                          target="_blank"
                          rel="noreferrer"
                        >
                          {' '}
                          sweet potato fries
                        </a>
                          cooked in olive oil
                      </li>
                    </ul>
                  </div>
                  <div className="meal">
                    <h4 className="mealName">Snack (2)</h4>
                    <ul className="mealItemsCollection">
                      <li className="mealitem">
                        1 cup (227 grams) of Greek yogurt and 1 cup (140 grams)
                        of strawberries
                      </li>
                    </ul>
                  </div>
                  <div className="meal">
                    <h4 className="mealName">Dinner</h4>
                    <ul className="mealItemsCollection">
                      <li className="mealitem">
                        4-ounce (112-gram) chicken breast, 1/2 cup (84 grams) of
                        quinoa, and 1 1/3 cups (85 grams) of sugar snap peas
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="diet_day">
                  <h3 className="day">Thursday</h3>
                  <div className="meal">
                    <h4 className="mealName">Breakfast</h4>
                    <ul className="mealItemsCollection">
                      <li className="mealitem">
                        3-egg omelet with sliced onions, red and green bell
                        peppers, and 1/4 cup (28 grams) of shredded cheese with
                        2 cups (480 ml) of dairy or plant-based milk to drink
                      </li>
                    </ul>
                  </div>
                  <div className="meal">
                    <h4 className="mealName">Snack</h4>
                    <ul className="mealItemsCollection">
                      <li className="mealitem">
                        2 tablespoons (33 grams) of peanut butter and 1 banana
                        on 1 slice of whole-wheat bread
                      </li>
                    </ul>
                  </div>
                  <div className="meal">
                    <h4 className="mealName">Lunch</h4>
                    <ul className="mealItemsCollection">
                      <li className="mealitem">
                        8 ounces (226 grams) of tilapia fillets, 1/4 cup (32
                        grams) of lentils, and a salad topped with 1/4 cup (30
                        grams) of walnuts
                      </li>
                    </ul>
                  </div>
                  <div className="meal">
                    <h4 className="mealName">Snack (2)</h4>
                    <ul className="mealItemsCollection">
                      <li className="mealitem">
                         2 sliced, hard-boiled{' '}
                        <a
                          href="https://www.healthline.com/nutrition/10-proven-health-benefits-of-eggs"
                          target="_blank"
                          rel="noreferrer"
                        >
                          eggs
                        </a>
                          atop a mixed green salad
                      </li>
                    </ul>
                  </div>
                  <div className="meal">
                    <h4 className="mealName">Dinner</h4>
                    <ul className="mealItemsCollection">
                      <li className="mealitem">
                        turkey chili made with a 4-ounce (114-gram) turkey
                        breast, chopped onions, garlic, celery, and sweet
                        peppers, 1/2 cup (123 grams) of canned, diced tomatoes,
                        and 1/2 cup (120 grams) of cannellini beans, topped with
                        1/4 cup (28 grams) of shredded cheese. Add oregano, bay
                        leaves, chili powder, and cumin as desired for taste.
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="diet_day">
                  <h3 className="day">Friday</h3>
                  <div className="meal">
                    <h4 className="mealName">Breakfast</h4>
                    <ul className="mealItemsCollection">
                      <li className="mealitem">
                        3 whole eggs, 1 apple, and 1 cup (80 grams) of oatmeal
                        made with 1 cup (240 ml) of dairy or plant-based milk
                      </li>
                    </ul>
                  </div>
                  <div className="meal">
                    <h4 className="mealName">Snack</h4>
                    <ul className="mealItemsCollection">
                      <li className="mealitem">
                        1 cup (226 grams) of plain yogurt with 1/4 cup (30
                        grams) of granola and 1/2 cup (70 grams) of{' '}
                        <a
                          href="https://www.healthline.com/nutrition/raspberry-nutrition"
                          target="_blank"
                          rel="noreferrer"
                        >
                           raspberries
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="meal">
                    <h4 className="mealName">Lunch</h4>
                    <ul className="mealItemsCollection">
                      <li className="mealitem">
                        6-ounce (168-gram) chicken breast, 1 medium-sized
                        (151-gram) sweet potato, 3/4 cup (85 grams) of green
                        beans, and 1 ounce (28 grams) of nuts
                      </li>
                    </ul>
                  </div>
                  <div className="meal">
                    <h4 className="mealName">Snack (2)</h4>
                    <ul className="mealItemsCollection">
                      <li className="mealitem">
                        1/2 cup (130 grams) of chickpeas atop greens
                      </li>
                    </ul>
                  </div>
                  <div className="meal">
                    <h4 className="mealName">Dinner</h4>
                    <ul className="mealItemsCollection">
                      <li className="mealitem">
                        burrito bowl with 6 ounces (170 grams) of chopped
                        sirloin steak, 1/2 cup (130 grams) of black beans, 1/2
                        cup (90 grams) of brown rice, 1 cup (35 grams) of
                        shredded lettuce and spinach, and 2 tablespoons (16
                        grams) of salsa
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="contact" style={{ paddingBottom: '30px' }}>
        <ContactForm />
      </div>
    </div>
  );
}
