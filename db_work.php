<?php
    $conn = new PDO("mysql:host=localhost;dbname=experiment_db", "root", "");
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    try {
        $conn->beginTransaction();

        $sql = "INSERT INTO coefficients (aValue, bValue, RValue) VALUES (?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->execute(array($_POST["a"], $_POST['b'], $_POST['R']));
        $experimentId = $conn->lastInsertId();

        for ($i = 0; $i < $_POST['n']; $i++){
            $x_name = 'x' . ($i + 1);
            $y = $_POST['a'] * $_POST[$x_name] + $_POST['b'];
            $sql = "INSERT INTO experiment_data (xExperiment, yCalc, experimentId) VALUES (?, ?, ?)";
            $stmt = $conn->prepare($sql);
            $stmt->execute(array($_POST[$x_name], $y, $experimentId));
        }
        $conn->commit();
    }
    catch (PDOException $e){
        $conn->rollBack();
    }
    catch (TypeError $e){
        echo '<script> alert("Не удалось записать данные!" </script>';
    }

    header("Location: http://localhost:8081/prog_lab_5/index.html");
?>