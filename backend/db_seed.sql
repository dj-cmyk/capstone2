
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
                        description, 
                        "hasProp", 
                        "propDescription")
    VALUES 
        (2, 1, 'Butterfly Warm Up - PBT butterfly and caterpillar exercise (start with legs extended in parallel, fold knees up to ceiling toes sliding along the floor staying seated tall, extend legs back out. On the third time through once knees are pointing up then turn out to butterfly legs, turn back to parallel, send legs long to extend again. Then stretch forward over legs', false, NULL),
        (2, 1, 'Puppet Strings Warm Up - in parallel and turned out', false, NULL),
        (2, 2, 'Turnout standing - start in parallel and rotate legs to first keeping feet on the ground. Also practice eleves in parallel and turned out', false, NULL), 
        (2, 2, 'Plies - review demi plie, grand plie. Do combination with one hand on the barre. Combination -> 4 demi plies, 1 grand plie, 1 eleve (in 1st and in 2nd)', true, 'rainbow scarves'),
        (2, 2, 'Tendus - from 1st with backs to the barre - Tendu front, flex, pointe, close twice with right foot, 1 tendu side, temps lie to change. R/L/R/L. Make sure tendu side is drawing the line that follow the foot for turn out', false, NULL),
        (2, 2, 'Pique Chase combination - in a line facing the teacher, do 2 piques, 2 chases, pique soutenous, 1 echappe. repeat to the left', true, 'ribbon rings'),
        (2, 2, 'Coupe Passe - facing the barre, focus on knee to the side', false, NULL),
        (2, 2, 'Grand Battement - backs to the barre grand battement to front only - brush out, tendu, close in 1st. 4 right and 4 left', false, NULL), 
        (2, 3, 'Port De Bras practice - half, full, L-T-S-O', true, 'scarves or butterfly wings'),
        (2, 3, 'Saute practice - in 1st, 2nd, echappe', false, NULL),
        (2, 3, 'Review and practice pas de chat from 1st position', false, NULL),
        (2, 4, 'Diagonal pattern - Chase between each flower - Saute in 1st on first flower, Pas de chat on 2nd flower, Arabesque on 3rd flower, Turn at the end', true, 'flower floor spots and butterfly wands'), 
        (2, 4, 'Butterfly pattern - start in the center of the room as if that is the head of the butterfly, Chase around to the right to make the right wing, same to left to make the left wing, passe skip from the back of the room towards the mirror in the center to make the body of the butterfly, one turn for each of the antennae', true, 'floor spots to mark out the butterfly pattern to follow'), 
        (2, 4, 'leaps', false, NULL);


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

INSERT INTO class_exercises ("lessonPlanID", "exerciseID")
    VALUES 
        (1, 1),
        (1, 2),
        (1, 3),
        (1, 4),
        (1, 5), 
        (1, 6), 
        (1, 7),
        (1, 8),
        (1, 9),
        (1, 10),
        (1, 11), 
        (1, 12), 
        (1, 13), 
        (1, 14);