
INSERT INTO exercise_categories (name)
    VALUES ('warmup'), ('barre'), ('center'), ('across the floor');

INSERT INTO level_categories (name)
    VALUES ('preschool'), ('primary'), ('beginner'), ('intermediate'), ('advanced');

INSERT INTO levels (name, "levelCategoryId")
    VALUES 
        ('PCM-Preschool Creative Movement', 2), 
        ('Pre-Ballet', 2), 
        ('Ballet 1', 2), 
        ('Ballet 2', 2),
        ('Ballet 3', 3),
        ('Ballet 4', 3),
        ('Ballet 5', 3),
        ('Ballet 6A', 4),
        ('Ballet 6B1', 4),
        ('Ballet 6B2', 4),
        ('Ballet 7', 5),
        ('Pre-Professional', 5);


INSERT INTO exercises ("levelCategoryID", 
                        "exerciseCategoryID", 
                        description)
    VALUES 
        (2, 1, 'Butterfly Warm Up - PBT butterfly and caterpillar exercise (start with legs extended in parallel, fold knees up to ceiling toes sliding along the floor staying seated tall, extend legs back out. On the third time through once knees are pointing up then turn out to butterfly legs, turn back to parallel, send legs long to extend again. Then stretch forward over legs'),
        (2, 1, 'Puppet Strings Warm Up - in parallel and turned out'),
        (2, 2, 'Turnout standing - start in parallel and rotate legs to first keeping feet on the ground. Also practice eleves in parallel and turned out'), 
        (2, 2, 'Plies - review demi plie, grand plie. Do combination with one hand on the barre. Combination -> 4 demi plies, 1 grand plie, 1 eleve (in 1st and in 2nd)'),
        (2, 2, 'Tendus - from 1st with backs to the barre - Tendu front, flex, pointe, close twice with right foot, 1 tendu side, temps lie to change. R/L/R/L. Make sure tendu side is drawing the line that follow the foot for turn out'),
        (2, 2, 'Pique Chase combination - in a line facing the teacher, do 2 piques, 2 chases, pique soutenous, 1 echappe. repeat to the left'),
        (2, 2, 'Coupe Passe - facing the barre, focus on knee to the side'),
        (2, 2, 'Grand Battement - backs to the barre grand battement to front only - brush out, tendu, close in 1st. 4 right and 4 left'), 
        (2, 3, 'Port De Bras practice - half, full, L-T-S-O'),
        (2, 3, 'Saute practice - in 1st, 2nd, echappe'),
        (2, 3, 'Review and practice pas de chat from 1st position'),
        (2, 4, 'Diagonal pattern - Chase between each flower - Saute in 1st on first flower, Pas de chat on 2nd flower, Arabesque on 3rd flower, Turn at the end'), 
        (2, 4, 'Butterfly pattern - start in the center of the room as if that is the head of the butterfly, Chase around to the right to make the right wing, same to left to make the left wing, passe skip from the back of the room towards the mirror in the center to make the body of the butterfly, one turn for each of the antennae'), 
        (2, 4, 'leaps'),
        (2, 1, 'Mermaid stretch - Pressing through the hands from bottom to top (making waves with hands), then practice the same with feet (flapping mermaid tail), other mermaid arms/stretches'), 
        (2, 1, 'Toe ball heel marches in place'),
        (2, 2, 'Plies - review demi plie, grand plie. Do combination with one hand on the barre. Combination -> 2 demi plies, 1 grand plie, 1 eleve (in 1st and in 2nd). Try for demi plie only in 5th as well.'), 
        (2, 2, 'Tendus - from 1st backs to the barre - Ball of foot, stretch the toes, ball of the foot, close. Front and side'), 
        (2, 2, 'Jetes - step away from the barre - Penguin jetes, hands on hips'), 
        (2, 2, 'Temps Lie practice - 3 temps lie, 1 turn right. Same left'), 
        (2, 2, 'Rond De Jambe - backs to the barre - Front side close 1st and side front close 1st. Passe balance on flat'), 
        (2, 3, '8 eleves and 8 sautes in 1st - trying to land with toe ball heel and being very quiet'), 
        (2, 3, 'Spring Points'), 
        (2, 3, 'Echappes'), 
        (2, 3, 'A-I-A-P'), 
        (2, 4, '4 corners pattern - Saute in 1st on first corner - Saute in 2nd on 2nd corner - Echappe on 3rd corner - Pas de chat on 4th corner'), 
        (2, 4, 'Practice skipping to a specific spot and then freeze on that spot'), 
        (2, 4, 'Chase to the middle of the room, do a turn, then run and leap');


INSERT INTO lesson_plans ("order", "theme", "focus", "levelID")
    VALUES 
        (1, 'butterflies', 'turn out', 5), 
        (2, 'ocean waves', 'through the feet', 5), 
        (3, 'princess', 'posture', 5), 
        (4, 'rainbows', 'port de bras', 5), 
        (5, 'autumn', '5th position and balance', 5),
        (6, 'animals', 'creativity', 5),
        (7, 'flowers', 'weight transfer', 5),
        (8, 'unicorns + magic', 'use of head, focus, eyes', 5),
        (9, 'halloween', 'turn out', 5), 
        (10, 'candy - nutcracker sweets', NULL, 5),
        (11, 'fairies', 'quiet feet', 5), 
        (12, 'dolls', 'posture', 5);

INSERT INTO classes ("lessonPlanID", "exerciseID", "hasProp", "propDescription", "notes", "spotifyURI")
    VALUES 
        (2, 15, false, NULL, 'set up theme for class', 'spotify:track:5pdANxh2HUH62WJu0HdRQO'),
        (2, 16, false, NULL, NULL, 'spotify:track:0HHuHOteyhbpzYWd6qLiiG'),
        (2, 17, false, NULL, NULL, 'spotify:track:2JLRFaBineYJfJA99pHqTY'),
        (2, 18, false, NULL, NULL, 'spotify:track:0oNNYsDhZIMdDNrJ9U61Fa'),
        (2, 19, false, NULL, NULL, 'spotify:track:0AmjzJ1wibXqtaNEKllsnQ'), 
        (2, 20, true, 'blue scarves', 'making waves like the ocean', 'spotify:track:0ZEpU0i4RcfGtziGtvFtyY'), 
        (2, 21, false, NULL, NULL, 'spotify:track:4XRstKYdUrHkPphbxd3GgW'),
        (2, 8, false, NULL, 'Imagine you are like a diver at the olympics trying to make the least amount of splash possible when your leg comes back down to the ground', 'spotify:track:5Zb6jmI3Sn52n2McYbVEpa'),
        (2, 22, false, NULL, NULL, 'spotify:track:1dr0QB4UavTSEL2ZQuVwbz'),
        (2, 23, false, NULL, NULL, 'spotify:track:6WcC7iZGFWOoOqbBP5LSV2'),
        (2, 24, false, NULL, NULL, 'spotify:track:1nao9jiaHP9Tj4FjM1mCmJ'), 
        (2, 25, false, NULL, NULL, 'spotify:track:7cw5NZccxPNIPtLJltIuqe'), 
        (2, 26, true, 'floor spots for 4 corners, shark stuffed animal', 'can put shark stuffed animal in the middle and leap over it if needed for extra time/activity', 'spotify:track:0VSBe9nctIb2f8b9GgXw0U'), 
        (2, 27, true, 'floor spots', 'can freeze in a different ballet position on each specific floor spot', 'spotify:track:6uMeSD4ZXjnmuNNRORsZK8'), 
        (2, 28, true, 'under sea carpet', NULL, 'spotify:track:1S455AnbIKbfsPSIPiWAci');