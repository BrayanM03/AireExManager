<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<meta name="description" content="Responsive Admin &amp; Dashboard Template based on Bootstrap 5">
	<meta name="author" content="AdminKit">
	<meta name="keywords" content="adminkit, bootstrap, bootstrap 5, admin, dashboard, template, responsive, css, sass, html, theme, front-end, ui kit, web">

	<link rel="preconnect" href="https://fonts.gstatic.com">
	<link rel="shortcut icon" href="img/icons/icon-48x48.png" />

	<link rel="canonical" href="https://demo-basic.adminkit.io/pages-sign-in.html" />

	<title>Sign In | AdminKit Demo</title>

	<link href="css/app.css" rel="stylesheet">
	<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&display=swap" rel="stylesheet">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />
</head>

<body>
	<main class="d-flex w-100">
		<div class="container d-flex flex-column">
			<div class="row vh-100">
				<div class="col-sm-10 col-md-8 col-lg-6 mx-auto d-table h-100">
					<div class="d-table-cell align-middle">

						<div class="text-center mt-4">
							<h1 class="h2">Hola, bienvenido</h1>
							<p class="lead">
								Accede a tu cuenta para continuar
							</p>
						</div>

						<div class="card">
							<div class="card-body">
								<div class="m-sm-4">
									<div class="text-center">
										<img src="img/avatars/mascota.png" alt="Charles Hall" class="img-fluid" width="100" height="100" />
									</div>
									<form>
										<div class="mb-3">
											<label class="form-label">Usuario</label>
											<input class="form-control form-control-lg animate__animated" type="text" name="user" id="user" placeholder="Ingresa tu usuario" />
										</div>
										<div class="mb-3">
											<label class="form-label">Contraseña</label>
											<input class="form-control form-control-lg animate__animated" type="password" name="pass" id="pass" placeholder="Ingresa tu contraseña" />
											<small>
												<a href="index.html">¿Olvidaste tu contraseña?</a>
											</small>
										</div>
										<div>
											<label class="form-check">
												<input class="form-check-input" type="checkbox" value="remember-me" name="remember-me" checked>
												<span class="form-check-label">
													Recuerdame la proxima vez
												</span>
											</label>
										</div>
										<div class="text-center mt-3">
											<a href="#validando" class="btn btn-lg btn-primary" onclick="iniciarSesion()">Entrar</a>
											<!-- <button type="submit" class="btn btn-lg btn-primary">Sign in</button> -->
										</div>
									</form>
								</div>
							</div>
						</div>

					</div>
				</div>
			</div>
		</div>
	</main>

	
	<script src="https://code.jquery.com/jquery-3.5.1.js"></script>
	<script src="js/app.js"></script>
	<script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
	<script src="js/login/login.js"></script>

</body>

</html>